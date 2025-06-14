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
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.badRequest().body("Missing or invalid Authorization header");
            }

            String token = authHeader.substring(7);

            service.addNewTransaction(
                    token,
                    request.getTransactiontype(),
                    request.getPlatform(),
                    request.getAmount(),
                    request.getUser().getId()
            );

            return ResponseEntity.ok("Transaction completed successfully");

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid transaction data: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Server error while processing transaction: " + e.getMessage());
        }
    }

    @PutMapping(path = "/update/{id}")
    public ResponseEntity<String> updateTransaction(
            @RequestBody transaction request,
            @PathVariable Long id) {
        try {
            service.updateTransaction(
                    request.getTransactiontype(),
                    request.getPlatform(),
                    request.getAmount(),
                    id
            );
            return ResponseEntity.ok("Transaction updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid input: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Server error while updating transaction: " + e.getMessage());
        }
    }

    @GetMapping(path = "/getAll")
    public @ResponseBody ResponseEntity<Iterable<transaction>> getAllTransactions() {
        try {
            return ResponseEntity.ok(service.getAllTransactions());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping(path = "/get/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            return service.getById(id);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid ID: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error fetching transaction: " + e.getMessage());
        }
    }
}
