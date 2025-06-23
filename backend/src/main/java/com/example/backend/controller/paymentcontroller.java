package com.example.backend.controller;

import com.example.backend.dtos.paymentdto;
import com.example.backend.entity.confirmationtype;
import com.example.backend.entity.payment;
import com.example.backend.service.paymentservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@RequestMapping(path = "/payment")
public class paymentcontroller {

    SimpleDateFormat ft = new SimpleDateFormat("dd-MM-yyyy");

    @Autowired
    private paymentservice service;

    @PostMapping(path = "/createCode")
    public ResponseEntity<String> addPaymentCode(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody payment request) {
        try {
            service.addNewPayment(
                    authHeader,
                    request.getPaymenttime(),
                    request.getAmount(),
                    confirmationtype.valueOf(confirmationtype.BYDATE.toString()),
                    request.getConfirmation(),
                    request.isCompleted(),
                    request.getReceiver().getId()
            );
            return ResponseEntity.ok("Payment added successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid input: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Server error while adding payment: " + e.getMessage());
        }
    }

    @PostMapping(path = "/createDate")
    public ResponseEntity<String> addPaymentDate(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody payment request) {
        try {
            service.addNewPayment(
                    authHeader,
                    request.getPaymenttime(),
                    request.getAmount(),
                    confirmationtype.valueOf(confirmationtype.BYCODE.toString()),
                    request.getConfirmation(),
                    request.isCompleted(),
                    request.getReceiver().getId()
            );
            return ResponseEntity.ok("Payment added successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid input: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Server error while adding payment: " + e.getMessage());
        }
    }

    @PostMapping(path = "/createByAccountNo")
    public ResponseEntity<String> addPaymentAccountNo(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody payment request) {
        try {
            service.payByAccount(
                    request.getReceiver().getAccountNo(),
                    authHeader,
                    request.getPaymenttime(),
                    request.getAmount(),
                    request.getConfirmationtype(),
                    request.getConfirmation()
            );
            return ResponseEntity.ok("Payment added successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid input: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Server error while adding payment: " + e.getMessage());
        }
    }

    @PostMapping(path = "/createByAccountNoCode")
    public ResponseEntity<String> addPaymentAccountNoCode(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody payment request) {
        try {
            service.payByAccount(
                    request.getReceiver().getAccountNo(),
                    authHeader,
                    request.getPaymenttime(),
                    request.getAmount(),
                    confirmationtype.valueOf(confirmationtype.BYCODE.toString()),
                    request.getConfirmation()
            );
            return ResponseEntity.ok("Payment added successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid input: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Server error while adding payment: " + e.getMessage());
        }
    }

    @PostMapping(path = "/createByAccountNoDate")
    public ResponseEntity<String> addPaymentAccountNoDate(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody payment request) {
        try {
            service.payByAccount(
                    request.getReceiver().getAccountNo(),
                    authHeader,
                    request.getPaymenttime(),
                    request.getAmount(),
                    confirmationtype.valueOf(confirmationtype.BYDATE.toString()),
                    request.getConfirmation()
            );
            return ResponseEntity.ok("Payment added successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid input: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Server error while adding payment: " + e.getMessage());
        }
    }

    @PutMapping(path = "/update/{id}")
    public ResponseEntity<String> updatePayment(@RequestBody payment request, @PathVariable Long id) {
        try {
            service.updatePayment(
                    request.getPaymenttime(),
                    request.getAmount(),
                    request.getConfirmationtype(),
                    request.isCompleted(),
                    request.getConfirmation(),
                    id
            );
            return ResponseEntity.ok("Payment updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid input: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Server error while updating payment: " + e.getMessage());
        }
    }

    @GetMapping(path = "/getAll")
    public @ResponseBody ResponseEntity<Iterable<payment>> getAllPayments() {
        try {
            return ResponseEntity.ok(service.getAllPayments());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping(path = "/get/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            return service.getById(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching payment by ID: " + e.getMessage());
        }
    }

    @GetMapping(path = "/getBySender")
    public @ResponseBody ResponseEntity<Iterable<paymentdto>> getBySender(@RequestHeader("Authorization") String authHeader){
        try {
            return service.getBySenderId(authHeader);
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping(path = "/getBySenderProcessing")
    public @ResponseBody ResponseEntity<Iterable<paymentdto>> getBySenderProcessing(@RequestHeader("Authorization") String authHeader){
        try {
            return service.getBySenderIdProcessing(authHeader);
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(path = "/getByReceiver")
    public @ResponseBody ResponseEntity<Iterable<paymentdto>> getByReceiver(@RequestHeader("Authorization") String authHeader){
        try {
            return service.getByRecipientId(authHeader);
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(path = "/getByReceiverProcessing")
    public @ResponseBody ResponseEntity<Iterable<paymentdto>> getByReceiverProcessing(@RequestHeader("Authorization") String authHeader){
        try {
            return service.getByRecipientIdProcesing(authHeader);
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping(path = "/payByDate/{id}")
    public ResponseEntity<String> updateByDate(@PathVariable Long id) {
        try {
            String formattedDate = ft.format(new Date());
            service.useDate(formattedDate, id);
            return ResponseEntity.ok("Payment processed using date");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing payment by date: " + e.getMessage());
        }
    }

    @PutMapping(path = "/payByCode/{id}")
    public ResponseEntity<String> updateByCode(@RequestParam String sender, @RequestParam String recipient, @PathVariable Long id) {
        try {
            service.useCode(sender, recipient, id);
            return ResponseEntity.ok("Payment processed using code");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing payment by code: " + e.getMessage());
        }
    }
}
