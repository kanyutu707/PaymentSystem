package com.example.backend.controller;

import com.example.backend.dtos.LoginUserDto;
import com.example.backend.dtos.RegisterUserDto;
import com.example.backend.entity.user;
import com.example.backend.service.AuthenticationService;
import com.example.backend.service.LoginResponse;
import com.example.backend.service.jwtservice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final jwtservice jwtService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(jwtservice jwtService, AuthenticationService authenticationService){
        this.jwtService=jwtService;
        this.authenticationService=authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<user> register(@RequestBody RegisterUserDto registerUserDto){
        user registeredUser=authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/signin")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto){
        user authenticatedUser=authenticationService.authenticate(loginUserDto);

        String jwtToken= jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse=new LoginResponse();
        loginResponse.setToken(jwtToken);

        return ResponseEntity.ok(loginResponse);
    }
}
