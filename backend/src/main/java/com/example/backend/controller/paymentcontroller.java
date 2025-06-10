package com.example.backend.controller;

import com.example.backend.entity.payment;
import com.example.backend.service.paymentservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "/payment")
public class paymentcontroller {

    @Autowired
    private paymentservice service;

    @PostMapping(path = "/create")
    public ResponseEntity<String> addPayment(@RequestBody payment request) {
        try {
            service.addNewPayment(
                    request.getPaymenttime(),
                    request.getAmount(),
                    request.getPaymenttype(),
                    request.getConfirmationtype(),
                    request.getConfirmation()
            );
            return ResponseEntity.ok("Payment added successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error adding payment: " + e.getMessage());
        }
    }

    @PutMapping(path = "/update/{id}")
    public  ResponseEntity<String> updatePayment(@RequestBody payment request,@PathVariable Long id){
        try{
            service.updatePayment(
                    request.getPaymenttime(),
                    request.getAmount(),
                    request.getPaymenttype(),
                    request.getConfirmationtype(),
                    request.getConfirmation() ,
                    id
            );
            return ResponseEntity.ok("Payment updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating payment: " + e.getMessage());
        }
        }

    @GetMapping(path = "/getAll")
    public @ResponseBody Iterable<payment> getAllPayments(){
        return service.getAllPayments();
    }

    @GetMapping(path="/get/{id}")
    public ResponseEntity<payment> getById(@PathVariable Long id) {
       return service.getById(id);
    }
}
