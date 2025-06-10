package com.example.backend.service;

import com.example.backend.entity.confirmationtype;
import com.example.backend.entity.payment;
import com.example.backend.entity.paymenttime;
import com.example.backend.entity.paymenttype;
import com.example.backend.repository.paymentrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class paymentservice {
    @Autowired
    private paymentrepo repository;

    public void addNewPayment(paymenttime paymenttime,
                                            Integer amount,
                                            paymenttype paymenttype,
                                            confirmationtype confirmationtype,
                                            String confirmation){
        payment  newpayment=new payment();

        newpayment.setPaymenttime(paymenttime);
        newpayment.setAmount(amount);
        newpayment.setPaymenttype(paymenttype);
        newpayment.setConfirmationtype(confirmationtype);
        newpayment.setConfirmation(confirmation);

        repository.save(newpayment);
    }

    public void updatePayment(paymenttime paymenttime,
                              Integer amount,
                              paymenttype paymenttype,
                              confirmationtype confirmationtype,
                              String confirmation, Long id){
        Optional<payment> updatepayment=repository.findById(id);
        if (updatepayment.isPresent()) {
            payment updatedpayment=updatepayment.get();
            if (paymenttime == null) {
                updatedpayment.setPaymenttime(updatedpayment.getPaymenttime());
            } else {
                updatedpayment.setPaymenttime(paymenttime);
            }
            if (amount == null) {
                updatedpayment.setAmount(updatedpayment.getAmount());
            } else {
                updatedpayment.setAmount(amount);
            }
            if (paymenttype == null) {
                updatedpayment.setPaymenttype(updatedpayment.getPaymenttype());
            } else {
                updatedpayment.setPaymenttype(paymenttype);
            }
            if (confirmationtype == null) {
                updatedpayment.setConfirmationtype(updatedpayment.getConfirmationtype());
            } else {
                updatedpayment.setConfirmationtype(confirmationtype);
            }
            if (confirmation == null) {
                updatedpayment.setConfirmation(updatedpayment.getConfirmation());
            } else {
                updatedpayment.setConfirmation(confirmation);
            }
            repository.save(updatedpayment);
        }
    }

    public Iterable<payment> getAllPayments(){
        return repository.findAll();
    }

    public ResponseEntity<payment> getById(Long id) {
        Optional<payment> paymentFound = repository.findById(id);
        if (paymentFound.isPresent()) {
            return ResponseEntity.ok(paymentFound.get());
        }
        return ResponseEntity.notFound().build();
    }
}

