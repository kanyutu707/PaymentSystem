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
    public ResponseEntity<String> createTransaction(@RequestBody transaction request){
        try {
            service.addNewTransaction(
                    request.getTransactiontype(),
                    request.getPlatform(),
                    request.getAmount(),
                    request.getUser().getId()
            );
            return  ResponseEntity.ok("Transaction completed successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing transaction: " + e.getMessage());
        }
    }

    @PutMapping(path = "/update/{id}")
    public  ResponseEntity<String> updateTransaction(@RequestBody transaction request, @PathVariable Long id){
        try {
            service.updateTransaction(
                    request.getTransactiontype(),
                    request.getPlatform(),
                    request.getAmount(),
                    id
            );
            return ResponseEntity.ok("Transaction updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating transaction: " + e.getMessage());
        }
    }

    @GetMapping(path = "/getAll")
    public  @ResponseBody Iterable<transaction> getAllTransactions(){
        return service.getAllTransactions();
    }

    @GetMapping(path = "/get/{id}")
    public ResponseEntity<transaction> getById(@PathVariable Long id){
        return service.getById(id);
    }
}
