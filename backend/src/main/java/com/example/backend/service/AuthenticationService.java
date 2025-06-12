package com.example.backend.service;

import com.example.backend.dtos.LoginUserDto;
import com.example.backend.dtos.RegisterUserDto;
import com.example.backend.entity.user;
import com.example.backend.repository.userrepo;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final userrepo userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            userrepo userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ){
        this.authenticationManager=authenticationManager;
        this.userRepository=userRepository;
        this.passwordEncoder=passwordEncoder;
    }

    public user signup(RegisterUserDto input){
        user User=new user();
                User.setFirstName(input.getFirstName());
                User.setLastName(input.getLastName());
                User.setEmail(input.getEmail());
                User.setPassword(passwordEncoder.encode(input.getPassword()));
        return userRepository.save(User);
    }

    public user  authenticate(LoginUserDto input){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )

        );
        return userRepository.findByEmail(input.getEmail()).orElseThrow();
    }
}
