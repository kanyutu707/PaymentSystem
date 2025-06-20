package com.example.backend.service;

import com.example.backend.dtos.LoggedInDTO;
import com.example.backend.entity.user;
import com.example.backend.repository.userrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private userrepo repository;

    @Autowired
    private DecodeJwt decodeJwt;

    public ResponseEntity<LoggedInDTO> getLoggedIn(String authHeader){
        Optional<user> optionalUser=repository.findById(decodeJwt.decodeJwt(authHeader));
        if(optionalUser.isPresent()){
            user User=optionalUser.get();
            LoggedInDTO loggedInDTO=new LoggedInDTO(User.getEmail(), User.getFirstName(),User.getLastName(), User.getIdNo(), User.getAccountNo(), User.getPhoneNo());
            return ResponseEntity.ok(loggedInDTO);
        }
        return ResponseEntity.notFound().build();
    }
}
