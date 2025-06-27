package com.example.backend.dtos;

public class paymentdto {
    private Long id;
    private int amount;
    private String confirmation;
    private String accountNo;


    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getConfirmation() {
        return confirmation;
    }

    public void setConfirmation(String confirmation) {
        this.confirmation = confirmation;
    }

    public String getAccountNo() {
        return accountNo;
    }


    public void setAccountNo(String accountNo) {
        this.accountNo = accountNo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public paymentdto(Long id, int amount, String confirmation, String accountNo) {
        this.id = id;
        this.amount = amount;
        this.confirmation = confirmation;
        this.accountNo = accountNo;
    }
}
