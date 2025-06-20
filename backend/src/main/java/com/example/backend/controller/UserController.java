package com.example.backend.controller;

import com.example.backend.dtos.LoggedInDTO;
import com.example.backend.entity.user;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/user")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping(path = "/loggedin")
    public ResponseEntity<LoggedInDTO> getLoggedIn(@RequestHeader("Authorization") String authHeader){
        return service.getLoggedIn(authHeader);
    }
}
