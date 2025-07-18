package com.example.backend.dtos;

import com.example.backend.entity.payment;
import com.example.backend.entity.transaction;
import jakarta.persistence.OneToMany;

import java.util.Set;

public class RegisterUserDto {
    private String email;
    private String password;
    private String firstName;
    private String lastName;

    private Set<payment> sent;

    private Set<payment> received;

    private Set<transaction> User;
    private Long idNo;
    private String accountNo;

    private String phoneNo;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Long getIdNo() {
        return idNo;
    }

    public void setIdNo(Long idNo) {
        this.idNo = idNo;
    }

    public String getAccountNo() {
        return accountNo;
    }

    public void setAccountNo(String accountNo) {
        this.accountNo = accountNo;
    }

    public Set<payment> getSent() {
        return sent;
    }

    public void setSent(Set<payment> sent) {
        this.sent = sent;
    }

    public Set<payment> getReceived() {
        return received;
    }

    public void setReceived(Set<payment> received) {
        this.received = received;
    }

    public Set<transaction> getUser() {
        return User;
    }

    public void setUser(Set<transaction> user) {
        User = user;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }
}
