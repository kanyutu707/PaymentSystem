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

    public void addNewTransaction(transactiontype transationtype,
                                  platform platform,
                                  Integer amount,
                                  Long userId
                               ){
        Optional<user> optionalUser=userRepo.findById(userId);

        if(optionalUser.isPresent()){
            user User=optionalUser.get();

            if(User.getId()!=null){
                transaction newtransaction=new transaction();
                newtransaction.setUser(User);
                newtransaction.setPlatform(platform);
                if(sharedData.checkAmount(userId)>=amount  && transationtype.toString().equals("WITHDRAWAL")) {
                    newtransaction.setAmount(amount);
                }
                else if(transationtype.toString().equals("DEPOSIT")){
                    newtransaction.setAmount(amount);
                }
                else{
                    return;
                }
                newtransaction.setTransactiontype(transationtype);


                repository.save(newtransaction);
            }
            }

    }

    public void updateTransaction(transactiontype transationtype,
                                  platform platform,
                                  Integer amount,
                                  Long id){
        Optional<transaction> updatetransaction=repository.findById(id);
        if(updatetransaction.isPresent()){
            transaction updatedtransaction=updatetransaction.get();
            if(transationtype==null){
                updatedtransaction.setTransactiontype(updatedtransaction.getTransactiontype());
            }
            else{
                updatedtransaction.setTransactiontype(transationtype);
            }
            if(platform==null){
                updatedtransaction.setPlatform(updatedtransaction.getPlatform());
            }
            else{
                updatedtransaction.setPlatform(platform);
            }
            if(amount==null){
                updatedtransaction.setAmount(updatedtransaction.getAmount());
            }
            else{
                updatedtransaction.setAmount(amount);
            }

            repository.save(updatedtransaction);
        }
    }
    public Iterable<transaction> getAllTransactions(){
        return repository.findAll();
    }

    public ResponseEntity<transaction> getById(Long id){
        Optional<transaction> transactionfound=repository.findById(id);
        if(transactionfound.isPresent()){
            return ResponseEntity.ok(transactionfound.get());
        }
        return ResponseEntity.notFound().build();
    }


}
