package com.example.backend.service;

import com.example.backend.entity.platform;
import com.example.backend.entity.transaction;
import com.example.backend.entity.transactiontype;
import com.example.backend.entity.user;
import com.example.backend.repository.transactionrepo;
import com.example.backend.repository.userrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class transactionservice {

    @Autowired
    private transactionrepo repository;

    @Autowired
    private SharedData sharedData;

    @Autowired
    private userrepo userRepo;

    @Autowired
    private DecodeJwt decodeJwt;

    public ResponseEntity<String> addNewTransaction(String authHeader,
                                  transactiontype transactiontype,
                                  platform platform,
                                  Integer amount) {

        user user = userRepo.findById(decodeJwt.decodeJwt(authHeader))
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (amount == null || amount <= 0) {
            throw new IllegalArgumentException("Amount must be greater than 0");
        }

        if (transactiontype == null) {
            throw new IllegalArgumentException("Transaction type is required");
        }

        if (transactiontype == transactiontype.WITHDRAWAL &&
                sharedData.checkAmount(authHeader) < amount) {
            throw new IllegalArgumentException("Insufficient balance for withdrawal");
        }

        transaction newTransaction = new transaction();
        newTransaction.setUser(user);
        newTransaction.setPlatform(platform);
        newTransaction.setTransactiontype(transactiontype);
        newTransaction.setAmount(amount);
        try {
            repository.save(newTransaction);
            return ResponseEntity.ok("transaction created successfully");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }


    }

    public ResponseEntity<String> updateTransaction(transactiontype transactiontype,
                                                    platform platform,
                                                    Integer amount,
                                                    Long id) {

        transaction existingTransaction = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Transaction not found"));

        if (transactiontype != null) existingTransaction.setTransactiontype(transactiontype);
        if (platform != null) existingTransaction.setPlatform(platform);
        if (amount != null && amount > 0) existingTransaction.setAmount(amount);

        try{
            repository.save(existingTransaction);
            return ResponseEntity.ok("transaction updated successfully");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    public ResponseEntity<Iterable<transaction>> getAllTransactions() {
        return ResponseEntity.ok(repository.findAll());
    }

    public ResponseEntity<transaction> getById(Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
