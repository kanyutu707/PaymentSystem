package com.example.backend.dtos;

public class LoggedInDTO {
    private String email;
    private String firstName;
    private String lastName;
    private Long idNo;
    private String accountNo;
    private String phoneNo;



    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public LoggedInDTO(String email, String firstName, String lastName, Long idNo, String accountNo, String phoneNo) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.idNo = idNo;
        this.accountNo = accountNo;
        this.phoneNo = phoneNo;
    }
}
