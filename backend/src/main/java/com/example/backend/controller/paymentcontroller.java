package com.example.backend.controller;

import com.example.backend.dtos.confirmdto;
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

            return service.addNewPayment(
                    authHeader,
                    request.getPaymenttime(),
                    request.getAmount(),
                    confirmationtype.valueOf(confirmationtype.BYDATE.toString()),
                    request.getConfirmation(),
                    request.isCompleted(),
                    request.getReceiver().getId()
            );

    }

    @PostMapping(path = "/createDate")
    public ResponseEntity<String> addPaymentDate(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody payment request) {

        return service.addNewPayment(
                    authHeader,
                    request.getPaymenttime(),
                    request.getAmount(),
                    confirmationtype.valueOf(confirmationtype.BYCODE.toString()),
                    request.getConfirmation(),
                    request.isCompleted(),
                    request.getReceiver().getId()
            );

    }

    @PostMapping(path = "/createByAccountNo")
    public ResponseEntity<String> addPaymentAccountNo(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody payment request) {

        return    service.payByAccount(
                    request.getReceiver().getAccountNo(),
                    authHeader,
                    request.getPaymenttime(),
                    request.getAmount(),
                    request.getConfirmationtype(),
                    request.getConfirmation()
            );

    }

    @PostMapping(path = "/createByAccountNoCode")
    public ResponseEntity<String> addPaymentAccountNoCode(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody payment request) {

        return    service.payByAccount(
                    request.getReceiver().getAccountNo(),
                    authHeader,
                    request.getPaymenttime(),
                    request.getAmount(),
                    confirmationtype.valueOf(confirmationtype.BYCODE.toString()),
                    request.getConfirmation()
            );

    }

    @PostMapping(path = "/createByAccountNoDate")
    public ResponseEntity<String> addPaymentAccountNoDate(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody payment request) {

        return    service.payByAccount(
                    request.getReceiver().getAccountNo(),
                    authHeader,
                    request.getPaymenttime(),
                    request.getAmount(),
                    confirmationtype.valueOf(confirmationtype.BYDATE.toString()),
                    request.getConfirmation()
            );

    }

    @PutMapping(path = "/update/{id}")
    public ResponseEntity<String> updatePayment(@RequestBody payment request, @PathVariable Long id) {

        return    service.updatePayment(
                    request.getPaymenttime(),
                    request.getAmount(),
                    request.getConfirmationtype(),
                    request.isCompleted(),
                    request.getConfirmation(),
                    id
            );

    }

    @GetMapping(path = "/getAll")
    public @ResponseBody ResponseEntity<Iterable<payment>> getAllPayments() {
       return service.getAllPayments();

    }

    @GetMapping(path = "/get/{id}")
    public ResponseEntity<payment> getById(@PathVariable Long id) {

            return service.getById(id);

    }

    @GetMapping(path = "/getBySender")
    public @ResponseBody ResponseEntity<Iterable<paymentdto>> getBySender(@RequestHeader("Authorization") String authHeader){

            return service.getBySenderId(authHeader);

    }
    @GetMapping(path = "/getBySenderProcessing")
    public @ResponseBody ResponseEntity<Iterable<paymentdto>> getBySenderProcessing(@RequestHeader("Authorization") String authHeader){

            return service.getBySenderIdProcessing(authHeader);

    }

    @GetMapping(path = "/getByReceiver")
    public @ResponseBody ResponseEntity<Iterable<paymentdto>> getByReceiver(@RequestHeader("Authorization") String authHeader){

            return service.getByRecipientId(authHeader);

    }

    @GetMapping(path = "/getByReceiverProcessing")
    public @ResponseBody ResponseEntity<Iterable<paymentdto>> getByReceiverProcessing(@RequestHeader("Authorization") String authHeader){

            return service.getByRecipientIdProcesing(authHeader);

    }


    @PutMapping("/confirmbysender")
    public ResponseEntity<String> confirmBySender(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody confirmdto request) {

        return service.confirmSender(request.getId(), request.getCode(), authHeader);
    }

    @PutMapping("/confirmbyrecipient")
    public ResponseEntity<String> confirmByRecipient(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody confirmdto request) {

        return service.confirmRecipient(request.getId(), request.getCode(), authHeader);
    }


    @PutMapping(path = "/payByCode/{id}")
    public ResponseEntity<String> updateByCode(@RequestParam String sender, @RequestParam String recipient, @PathVariable Long id) {

        return service.useCode(sender, recipient, id);

    }
}
