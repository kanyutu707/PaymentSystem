package com.example.backend.controller;

import com.example.backend.entity.payment;
import com.example.backend.service.paymentservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@RequestMapping(path = "/payment")
public class paymentcontroller {


    SimpleDateFormat ft=new SimpleDateFormat("dd-MM-yyyy");
    String formattedDate=ft.format(new Date());

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
                    request.getConfirmation(),
                    request.isCompleted(),
                    request.getSender().getId(),
                    request.getReceiver().getId()
            );
            return ResponseEntity.ok("Payment added successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error adding payment: " + e.getMessage());
        }
    }

    @PutMapping(path = "/update/{id}")
    public  ResponseEntity<String> updatePayment(@RequestBody payment request, @PathVariable Long id){
        try{
            service.updatePayment(
                    request.getPaymenttime(),
                    request.getAmount(),
                    request.getPaymenttype(),
                    request.getConfirmationtype(),
                    request.isCompleted(),
                    request.getConfirmation(),
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

    @PutMapping(path = "/payByDate/{id}")
    public String updateByDate(@PathVariable Long id){
        service.useDate(formattedDate, id);
        return "Payment successful";
    }

    @PutMapping(path = "/payByCode/{id}")
    public String updateByCode(@RequestParam String sender, @RequestParam String recipient, @PathVariable Long id){
        service.useCode(sender, recipient, id);
        return "Payment successful";
    }


}
