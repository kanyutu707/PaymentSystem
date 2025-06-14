package com.example.backend.service;

import com.example.backend.entity.*;
import com.example.backend.repository.paymentrepo;
import com.example.backend.repository.userrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.apache.commons.lang3.RandomStringUtils;

import java.util.Optional;

@Service
public class paymentservice {

    @Autowired
    private paymentrepo repository;

    @Autowired
    private SharedData sharedData;

    @Autowired
    private userrepo userRepo;

    public String addNewPayment(paymenttime paymenttime,
                                            Integer amount,
                                            paymenttype paymenttype,
                                            confirmationtype confirmationtype,
                                            String confirmation,
                                            boolean isCompleted,
                                            Long senderId,
                                            Long recipientId){
        Optional<user> optionalSender=userRepo.findById(senderId);
        Optional<user> optionalRecipient=userRepo.findById(recipientId);

        if(optionalSender.isPresent()){
            user Sender=optionalSender.get();
            if(optionalRecipient.isPresent()){
                user Recipient=optionalRecipient.get();
                if(Sender.getId()!=null && Recipient.getId()!=null){
                    payment  newpayment=new payment();

                    newpayment.setSender(Sender);
                    newpayment.setReceiver(Recipient);
                    newpayment.setPaymenttime(paymenttime);
                    if(sharedData.checkAmount(senderId)>=amount && paymenttype.toString().equals("SENT")) {
                        newpayment.setAmount(amount);
                    }
                    else if(paymenttype.toString().equals("RECEIPTS")){
                        newpayment.setAmount(amount);
                    }else{
                        return "Sorry insufficient balance";
                    }
                    newpayment.setPaymenttype(paymenttype);
                    newpayment.setConfirmationtype(confirmationtype);
                    newpayment.setCompleted(isCompleted);

                    if(confirmationtype.toString().equals("BYCODE")){
                        newpayment.setConfirmation(generateConfirmationCode());
                    }else{
                        newpayment.setConfirmation(confirmation);
                    }

                    repository.save(newpayment);
                }
                return "Recipient not found";
            }
            return "Sender not found";
        }
        return "Payment successful";
    }

    public void updatePayment(paymenttime paymenttime,
                              Integer amount,
                              paymenttype paymenttype,
                              confirmationtype confirmationtype,
                              boolean isCompleted,
                              String confirmation, Long id){
        Optional<payment> updatepayment=repository.findById(id);
        if (updatepayment.isPresent()) {
            payment updatedpayment=updatepayment.get();
            if (paymenttime == null) {
                updatedpayment.setPaymenttime(updatedpayment.getPaymenttime());
            } else {
                updatedpayment.setPaymenttime(paymenttime);
            }
            if (amount == null) {
                updatedpayment.setAmount(updatedpayment.getAmount());
            } else {
                updatedpayment.setAmount(amount);
            }
            if (paymenttype == null) {
                updatedpayment.setPaymenttype(updatedpayment.getPaymenttype());
            } else {
                updatedpayment.setPaymenttype(paymenttype);
            }
            if (confirmationtype == null) {
                updatedpayment.setConfirmationtype(updatedpayment.getConfirmationtype());
            } else {
                updatedpayment.setConfirmationtype(confirmationtype);
            }
            if (confirmation == null) {
                updatedpayment.setConfirmation(updatedpayment.getConfirmation());
            } else {
                updatedpayment.setConfirmation(confirmation);
            }
            if(!isCompleted){
                updatedpayment.setCompleted(updatedpayment.isCompleted());
            }
            else{
                updatedpayment.setCompleted(isCompleted);
            }
            repository.save(updatedpayment);
        }
    }

    public Iterable<payment> getAllPayments(){
        return repository.findAll();
    }

    public ResponseEntity<payment> getById(Long id) {
        Optional<payment> paymentFound = repository.findById(id);
        if (paymentFound.isPresent()) {
            return ResponseEntity.ok(paymentFound.get());
        }
        return ResponseEntity.notFound().build();
    }

    public String generateConfirmationCode(){
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()-_=+[{]}\\|;:\'\",<.>/?";
        String pwd = RandomStringUtils.random( 20, characters );
        return pwd;
    }

    public  String completePayment(Long id){
        Optional<payment> paymentFound = repository.findById(id);
        if (paymentFound.isPresent()) {
            payment Payment=paymentFound.get();
            if(!Payment.isCompleted()){
               Payment.setCompleted(true);
               return "Payment done";
            }
            return "Unable to complete payment";
        }
        return "Payment not found";
    }

    public String useCode(String sender, String recipient, Long id){
        Optional<payment> paymentFound = repository.findById(id);
        if (paymentFound.isPresent()) {
            payment Payment=paymentFound.get();
            if(Payment.getConfirmation().equals(sender.concat(recipient) )&& Payment.getConfirmationtype().toString().equals("BYCODE")){
                completePayment(id);
                return "Code match confirmed payment succeeded";
            }else{
                return "Code do not match payment unsuccessful";
            }
        }
        return "Sorry the payment cannot be found";
    }

    public  String useDate(String currentDate, Long id){

        Optional<payment> paymentFound = repository.findById(id);
        if (paymentFound.isPresent()) {
            payment Payment=paymentFound.get();
            if(Payment.getConfirmation().equals(currentDate)&& Payment.getConfirmationtype().toString().equals("BYDATE")){
                completePayment(id);
                return "Date match match confirmed payment succeeded";
            }else{
                return "Date do not match payment unsuccessful";
            }
        }
        return "Sorry the payment cannot be found";
    }
}

