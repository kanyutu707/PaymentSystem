package com.example.backend.service;

import com.example.backend.entity.payment;
import com.example.backend.entity.transaction;
import com.example.backend.repository.paymentrepo;
import com.example.backend.repository.transactionrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SharedData {

    @Autowired
    private paymentrepo paymentRepo;

    @Autowired
    private transactionrepo transactRepo;

    @Autowired
    private DecodeJwt decodeJwt;

    public Integer checkAmount(String token) {
        Long userId = decodeJwt.decodeJwt(token); // Decode once

        int receivedPayments = paymentRepo.findAll().stream()
                .filter(p -> p.getReceiver().getId().equals(userId))
                .mapToInt(payment::getAmount)
                .sum();

        int sentPayments = paymentRepo.findAll().stream()
                .filter(p -> p.getSender().getId().equals(userId))
                .mapToInt(payment::getAmount)
                .sum();

        int receivedTransactions = transactRepo.findAll().stream()
                .filter(t -> (t.getUser().getId().equals(userId) && t.getTransactiontype().toString().equals("DEPOSIT")))
                .mapToInt(transaction::getAmount)
                .sum();
        int sentTransactions = transactRepo.findAll().stream()
                .filter(t -> (t.getUser().getId().equals(userId) && t.getTransactiontype().toString().equals("WITHDRAWAL")))
                .mapToInt(transaction::getAmount)
                .sum();

        return (receivedPayments + receivedTransactions)-( sentTransactions- sentPayments);
    }
}
