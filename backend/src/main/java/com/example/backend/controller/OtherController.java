package com.example.backend.controller;

import com.example.backend.service.Others;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/money")
public class OtherController {

    @Autowired
    private Others other;

    @GetMapping(path = "/deposits")
    public ResponseEntity<Integer> getDeposits( @RequestHeader("Authorization") String authHeader){
        return other.fetchDeposits(authHeader);
    }

    @GetMapping(path = "/withdrawals")
    public ResponseEntity<Integer> getWithdrawals( @RequestHeader("Authorization") String authHeader){
        return other.fetchWithdrawals(authHeader);
    }

    @GetMapping(path = "/sent")
    public ResponseEntity<Integer> getSent( @RequestHeader("Authorization") String authHeader){
        return other.fetchSent(authHeader);
    }

    @GetMapping(path = "/received")
    public ResponseEntity<Integer> getReceived( @RequestHeader("Authorization") String authHeader){
        return other.fetchReceived(authHeader);
    }

    @GetMapping(path = "/balance")
    public ResponseEntity<Integer> getBalance(@RequestHeader("Authorization") String authHeader){
        return other.fetchBalance(authHeader);
    }
}
