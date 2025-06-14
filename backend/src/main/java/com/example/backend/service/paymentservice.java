package com.example.backend.service;

import com.example.backend.entity.*;
import com.example.backend.repository.paymentrepo;
import com.example.backend.repository.userrepo;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class paymentservice {

    @Autowired
    private paymentrepo repository;

    @Autowired
    private SharedData sharedData;

    @Autowired
    private userrepo userRepo;

    public void addNewPayment(String authHeader,
                              paymenttime paymenttime,
                              Integer amount,
                              confirmationtype confirmationtype,
                              String confirmation,
                              boolean isCompleted,
                              Long senderId,
                              Long recipientId) {

        user sender = userRepo.findById(senderId)
                .orElseThrow(() -> new IllegalArgumentException("Sender not found"));

        user recipient = userRepo.findById(recipientId)
                .orElseThrow(() -> new IllegalArgumentException("Recipient not found"));

        if (sharedData.checkAmount(authHeader) < amount) {
            throw new IllegalArgumentException("Insufficient balance");
        }

        payment newPayment = new payment();
        newPayment.setSender(sender);
        newPayment.setReceiver(recipient);
        newPayment.setPaymenttime(paymenttime);
        newPayment.setAmount(amount);
        newPayment.setConfirmationtype(confirmationtype);
        newPayment.setCompleted(isCompleted);

        if (confirmationtype == confirmationtype.BYCODE) {
            newPayment.setConfirmation(generateConfirmationCode());
        } else {
            newPayment.setConfirmation(confirmation);
        }

        repository.save(newPayment);
    }

    public void updatePayment(paymenttime paymenttime,
                              Integer amount,
                              confirmationtype confirmationtype,
                              boolean isCompleted,
                              String confirmation,
                              Long id) {

        payment updatedPayment = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Payment not found"));

        if (paymenttime != null) updatedPayment.setPaymenttime(paymenttime);
        if (amount != null) updatedPayment.setAmount(amount);
        if (confirmationtype != null) updatedPayment.setConfirmationtype(confirmationtype);
        if (confirmation != null) updatedPayment.setConfirmation(confirmation);
        updatedPayment.setCompleted(isCompleted);

        repository.save(updatedPayment);
    }

    public Iterable<payment> getAllPayments() {
        return repository.findAll();
    }

    public ResponseEntity<payment> getById(Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    public String generateConfirmationCode() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?";
        return RandomStringUtils.random(20, characters);
    }

    public String completePayment(Long id) {
        Optional<payment> paymentFound = repository.findById(id);
        if (paymentFound.isPresent()) {
            payment payment = paymentFound.get();
            if (!payment.isCompleted()) {
                payment.setCompleted(true);
                repository.save(payment);
                return "Payment completed";
            } else {
                return "Payment already completed";
            }
        } else {
            return "Payment not found";
        }
    }

    public String useCode(String sender, String recipient, Long id) {
        Optional<payment> paymentFound = repository.findById(id);
        if (paymentFound.isEmpty()) return "Payment not found";

        payment payment = paymentFound.get();
        if (payment.getConfirmationtype() == confirmationtype.BYCODE &&
                payment.getConfirmation().equals(sender + recipient)) {
            return completePayment(id);
        } else {
            return "Code does not match. Payment unsuccessful";
        }
    }

    public String useDate(String currentDate, Long id) {
        Optional<payment> paymentFound = repository.findById(id);
        if (paymentFound.isEmpty()) return "Payment not found";

        payment payment = paymentFound.get();
        if (payment.getConfirmationtype() == confirmationtype.BYDATE &&
                payment.getConfirmation().equals(currentDate)) {
            return completePayment(id);
        } else {
            return "Date does not match. Payment unsuccessful";
        }
    }
}
