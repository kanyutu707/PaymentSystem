package com.example.backend.service;

import com.example.backend.entity.payment;
import com.example.backend.entity.transaction;
import com.example.backend.repository.paymentrepo;
import com.example.backend.repository.transactionrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class Others {
    @Autowired
    private SharedData sharedData;

    @Autowired
    private DecodeJwt decodeJwt;

    @Autowired
    private transactionrepo transactRepo;

    @Autowired
    private paymentrepo paymentRepo;

    public ResponseEntity<Integer> fetchBalance(String authToken) {
        int availableBalance = sharedData.checkAmount(authToken);
        if (availableBalance >= 0) {
            return ResponseEntity.ok(availableBalance);
        } else {
           return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Integer> fetchDeposits(String authToken){
        int receivedTransactions = transactRepo.findAll().stream()
                .filter(t -> (t.getUser().getId().equals(decodeJwt.decodeJwt(authToken)) && t.getTransactiontype().toString().equals("DEPOSIT")))
                .mapToInt(transaction::getAmount)
                .sum();

        if(receivedTransactions>=0) {
            return ResponseEntity.ok(receivedTransactions);
        }
        else{
            return ResponseEntity.ok(0);
        }
    }

    public ResponseEntity<Integer> fetchWithdrawals(String authToken){
        int sentTransactions = transactRepo.findAll().stream()
                .filter(t -> (t.getUser().getId().equals(decodeJwt.decodeJwt(authToken)) && t.getTransactiontype().toString().equals("WITHDRAWAL")))
                .mapToInt(transaction::getAmount)
                .sum();
        if(sentTransactions>=0){
            return ResponseEntity.ok(sentTransactions);
        }
        else{
            return ResponseEntity.ok(0);
        }

    }

    public ResponseEntity<Integer> fetchReceived(String authHeader){
        int receivedPayments = paymentRepo.findAll().stream()
                .filter(p -> p.getReceiver().getId().equals(decodeJwt.decodeJwt(authHeader)))
                .mapToInt(payment::getAmount)
                .sum();

        if(receivedPayments>=0){
            return ResponseEntity.ok(receivedPayments);
        }else{
            return ResponseEntity.ok(0);
        }
    }

    public ResponseEntity<Integer> fetchSent(String authHeader){
        int sentPayments = paymentRepo.findAll().stream()
                .filter(p -> p.getSender().getId().equals(decodeJwt.decodeJwt(authHeader)))
                .mapToInt(payment::getAmount)
                .sum();
        if(sentPayments>=0){
            return ResponseEntity.ok(sentPayments);
        }
        else{
            return ResponseEntity.ok(0);
        }
    }


}
