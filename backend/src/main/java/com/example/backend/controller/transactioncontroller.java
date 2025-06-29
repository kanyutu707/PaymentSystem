package com.example.backend.controller;

import com.example.backend.entity.transaction;
import com.example.backend.service.transactionservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "/transaction")
public class transactioncontroller {

    @Autowired
    private transactionservice service;

    @PostMapping(path = "/create")
    public ResponseEntity<String> createTransaction(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody transaction request) {

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.badRequest().body("Missing or invalid Authorization header");
            }

            String token = authHeader.substring(7);

            return service.addNewTransaction(
                    token,
                    request.getTransactiontype(),
                    request.getPlatform(),
                    request.getAmount()
            );

        }

    @PutMapping(path = "/update/{id}")
    public ResponseEntity<String> updateTransaction(
            @RequestBody transaction request,
            @PathVariable Long id) {

            return    service.updateTransaction(
                    request.getTransactiontype(),
                    request.getPlatform(),
                    request.getAmount(),
                    id
            );

    }

    @GetMapping(path = "/getAll")
    public @ResponseBody ResponseEntity<Iterable<transaction>> getAllTransactions() {
        return service.getAllTransactions();
    }

    @GetMapping(path = "/get/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return service.getById(id);
    }
}
