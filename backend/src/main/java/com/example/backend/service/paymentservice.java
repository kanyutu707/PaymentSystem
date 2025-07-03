package com.example.backend.service;

import com.example.backend.dtos.paymentdto;
import com.example.backend.entity.*;
import com.example.backend.repository.paymentrepo;
import com.example.backend.repository.userrepo;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class paymentservice {

    @Autowired
    private paymentrepo repository;

    @Autowired
    private SharedData sharedData;

    @Autowired
    private userrepo userRepo;

    @Autowired
    private DecodeJwt decodeJwt;

    public ResponseEntity<String> addNewPayment(String authHeader,
                              paymenttime paymenttime,
                              Integer amount,
                              confirmationtype confirmationtype,
                              String confirmation,
                              boolean isCompleted,
                              Long recipientId) {

        user sender = userRepo.findById(decodeJwt.decodeJwt(authHeader))
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

        if (confirmationtype == confirmationtype.BYCODE) {
            newPayment.setConfirmation(generateConfirmationCode());
        } else {
            newPayment.setConfirmation(confirmation);
        }

        if (paymenttime.toString().equals("CURRENT")) {
            newPayment.setCompleted(true);
        } else {
            newPayment.setCompleted(isCompleted);
        }
        try{
            repository.save(newPayment);

            return ResponseEntity.ok("payment created successfully");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    public ResponseEntity<String> updatePayment(paymenttime paymenttime,
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

        try{

            repository.save(updatedPayment);
            return ResponseEntity.ok("payment updated successfully");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    public ResponseEntity<Iterable<payment>> getAllPayments() {
        return ResponseEntity.ok(repository.findAll());
    }


    public ResponseEntity<Iterable<paymentdto>> getBySenderId(String token) {
        Optional<user> foundUser = userRepo.findById(decodeJwt.decodeJwt(token));
        if (foundUser.isPresent()) {
            user userFound = foundUser.get();
            List<payment> paymentFound = repository.findBysender(userFound);

            List<paymentdto> paymentDtos = new ArrayList<>();

            for (int singlepay = 0; singlepay < paymentFound.size(); singlepay++) {

                if (paymentFound.get(singlepay).isCompleted()) {

                    paymentdto founddto = new paymentdto(paymentFound.get(singlepay).getId(),paymentFound.get(singlepay).getAmount(), paymentFound.get(singlepay).getConfirmation(), paymentFound.get(singlepay).getSender().getAccountNo());

                    paymentDtos.add(founddto);
                }
            }


            return ResponseEntity.ok(paymentDtos);
        }


        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<Iterable<paymentdto>> getBySenderIdProcessing(String token) {
        Optional<user> foundUser = userRepo.findById(decodeJwt.decodeJwt(token));
        if (foundUser.isPresent()) {
            user userFound = foundUser.get();
            List<payment> paymentFound = repository.findBysender(userFound);

            List<paymentdto> paymentDtos = new ArrayList<>();

            for (int singlepay = 0; singlepay < paymentFound.size(); singlepay++) {

                if (!(paymentFound.get(singlepay).isCompleted())) {

                    paymentdto founddto = new paymentdto(paymentFound.get(singlepay).getId(), paymentFound.get(singlepay).getAmount(), paymentFound.get(singlepay).getConfirmation(), paymentFound.get(singlepay).getSender().getAccountNo());

                    paymentDtos.add(founddto);
                }
            }


            return ResponseEntity.ok(paymentDtos);
        }


        return ResponseEntity.notFound().build();
    }


    public ResponseEntity<Iterable<paymentdto>> getByRecipientId(String token) {
        Optional<user> foundUser = userRepo.findById(decodeJwt.decodeJwt(token));
        if (foundUser.isPresent()) {
            user userFound = foundUser.get();
            List<payment> paymentFound = repository.findByreceiver(userFound);

            List<paymentdto> paymentDtos = new ArrayList<>();

            for (int singlepay = 0; singlepay < paymentFound.size(); singlepay++) {

                if (paymentFound.get(singlepay).isCompleted()) {
                    paymentdto founddto = new paymentdto(paymentFound.get(singlepay).getId(), paymentFound.get(singlepay).getAmount(), paymentFound.get(singlepay).getConfirmation(), paymentFound.get(singlepay).getReceiver().getAccountNo());

                    paymentDtos.add(founddto);
                }
            }


            return ResponseEntity.ok(paymentDtos);
        }


        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<Iterable<paymentdto>> getByRecipientIdProcesing(String token) {
        Optional<user> foundUser = userRepo.findById(decodeJwt.decodeJwt(token));
        if (foundUser.isPresent()) {
            user userFound = foundUser.get();
            List<payment> paymentFound = repository.findByreceiver(userFound);

            List<paymentdto> paymentDtos = new ArrayList<>();

            for (int singlepay = 0; singlepay < paymentFound.size(); singlepay++) {

                if (!(paymentFound.get(singlepay).isCompleted())) {
                    paymentdto founddto = new paymentdto(paymentFound.get(singlepay).getId(), paymentFound.get(singlepay).getAmount(), paymentFound.get(singlepay).getConfirmation(), paymentFound.get(singlepay).getReceiver().getAccountNo());

                    paymentDtos.add(founddto);
                }
            }


            return ResponseEntity.ok(paymentDtos);
        }


        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<payment> getById(Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    public String generateConfirmationCode() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        return RandomStringUtils.random(10, characters);
    }

    public String completePayment(Long id) {
        Optional<payment> paymentFound = repository.findById(id);
        if (paymentFound.isPresent()) {
            payment payment = paymentFound.get();
            if (!payment.isCompleted()) {
                payment.setCompleted(true);
                try{
                    repository.save(payment);
                    return "Payment completed";
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            } else {
                return "Payment already completed";
            }
        } else {
            return "Payment not found";
        }
    }

    public ResponseEntity<String> useCode(String sender, String recipient, Long id) {
        Optional<payment> paymentFound = repository.findById(id);
        if (paymentFound.isEmpty()) return ResponseEntity.ok("Payment not found");

        payment payment = paymentFound.get();
        if (payment.getConfirmationtype() == confirmationtype.BYCODE &&
                payment.getConfirmation().equals(sender + recipient)) {
            return ResponseEntity.ok(completePayment(id));
        } else {
            return  ResponseEntity.ok("Code does not match. Payment unsuccessful");
        }
    }

    public ResponseEntity<String> payByAccount(String accountNo,
                                               String authHeader,
                                               paymenttime paymenttime,
                                               Integer amount,
                                               confirmationtype confirmationtype,
                                               String confirmation
    ) {

        if (accountNo == null || accountNo.isEmpty()) {
            throw new IllegalArgumentException("Receiver account number is required.");
        }

        Optional<user> userOptional = userRepo.findByAccountNo(accountNo);
        user sender = userRepo.findById(decodeJwt.decodeJwt(authHeader))
                .orElseThrow(() -> new IllegalArgumentException("Sender not found"));

        if (sharedData.checkAmount(authHeader) < amount) {
            throw new IllegalArgumentException("Insufficient balance");
        }

        if (userOptional.isPresent()) {
            user userFound = userOptional.get();

            payment newPayment = new payment();
            newPayment.setReceiver(userFound);
            newPayment.setSender(sender);
            newPayment.setPaymenttime(paymenttime);
            newPayment.setAmount(amount);
            newPayment.setConfirmationtype(confirmationtype);


            if (confirmationtype == confirmationtype.BYCODE) {
                newPayment.setConfirmation(generateConfirmationCode());
            } else {
                newPayment.setConfirmation(confirmation);
            }
            if (paymenttime.toString().equals("CURRENT")) {
                newPayment.setCompleted(true);
            } else {
                newPayment.setCompleted(false);
            }
            try{
                repository.save(newPayment);
                return ResponseEntity.ok("payment by account successful");
            } catch (Exception e) {
                throw new RuntimeException(e);
            }

        } else {
            throw new IllegalArgumentException("Recipient with account number not found.");
        }
    }


    public ResponseEntity<String> confirmSender(Long id, String codeInput, String authHeader) {
        Optional<payment> optionalPayment = repository.findById(id);
        if (optionalPayment.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment with that ID not found");
        }

        payment foundPayment = optionalPayment.get();
        if (foundPayment == null || foundPayment.getConfirmationtype() == null ||
                !foundPayment.getConfirmationtype().toString().equals("BYCODE")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Sorry, the data is not defined by code.");
        }

        Long senderIdFromJwt = decodeJwt.decodeJwt(authHeader);
        if (!Objects.equals(foundPayment.getSender().getId(), senderIdFromJwt)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sender not authorized");
        }

        if (codeInput == null || codeInput.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Sender code must not be empty");
        }

        foundPayment.setSenderCode(codeInput.trim());

        if (isValidCode(foundPayment.getSenderCode()) &&
                isValidCode(foundPayment.getReceiverCode()) &&
                !foundPayment.isCompleted()) {
            foundPayment.setCompleted(true);
        }
        try{
            repository.save(foundPayment);
            return ResponseEntity.ok("Sender confirmation successful");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<String> confirmRecipient(Long id, String codeInput, String authHeader) {
        Optional<payment> optionalPayment = repository.findById(id);
        if (optionalPayment.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment with that ID not found");
        }

        payment foundPayment = optionalPayment.get();
        if (foundPayment == null || foundPayment.getConfirmationtype() == null ||
                !foundPayment.getConfirmationtype().toString().equals("BYCODE")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Sorry, the data is not defined by code.");
        }

        Long receiverIdFromJwt = decodeJwt.decodeJwt(authHeader);
        if (!Objects.equals(foundPayment.getReceiver().getId(), receiverIdFromJwt)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Recipient not authorized");
        }

        if (codeInput == null || codeInput.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Receiver code must not be empty");
        }

        foundPayment.setReceiverCode(codeInput.trim());

        if (isValidCode(foundPayment.getSenderCode()) &&
                isValidCode(foundPayment.getReceiverCode()) &&
                !foundPayment.isCompleted()) {
            foundPayment.setCompleted(true);
        }
        try{
            repository.save(foundPayment);
            return ResponseEntity.ok("Recipient confirmation successful");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    private boolean isValidCode(String code) {
        return code != null && !code.trim().isEmpty();
    }



    @Scheduled(cron = "0 0 0 * * *")
    public void autoCompletePaymentsByDate() {
        String formattedDate = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        List<payment> payments = repository.findByConfirmationtypeAndIsCompleted(confirmationtype.BYDATE, false);

        for (payment p : payments) {
            if (formattedDate.equals(p.getConfirmation())) {
                p.setCompleted(true);
                try {
                    repository.save(p);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }

            }
        }
    }
}
