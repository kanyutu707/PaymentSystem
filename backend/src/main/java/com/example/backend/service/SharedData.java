package com.example.backend.service;

import com.example.backend.entity.payment;
import com.example.backend.entity.transaction;
import com.example.backend.repository.paymentrepo;
import com.example.backend.repository.transactionrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class SharedData {

    @Autowired
    private paymentrepo paymentRepo;

    @Autowired
    private transactionrepo transactRepo;


    public Integer checkAmount(Long id){
        List<payment> Payments =paymentRepo.findAll();
        List<transaction> Transactions=transactRepo.findAll();

        Integer additions=0;
        Integer subtractions=0;


            for (int payment = 0; payment < Payments.size(); payment++) {
                if(Payments.get(payment).getPaymenttype().toString().equals("RECEIPTS") && ( Objects.equals(Payments.get(payment).getReceiver().getId(), id))) {
                    additions+=Payments.get(payment).getAmount();
                }else{
                    subtractions+=Payments.get(payment).getAmount();
                }
            }

            for(int transaction=0; transaction< Transactions.size(); transaction++){
                if(Transactions.get(transaction).getTransactiontype().toString().equals("DEPOSIT") && Objects.equals(Transactions.get(transaction).getUser().getId(), id)){
                    additions+=Transactions.get(transaction).getAmount();
                }else{
                    subtractions+=Transactions.get(transaction).getAmount();
                }
            }



        return additions-subtractions;
    }

}
