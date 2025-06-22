package com.example.backend.dtos;

public class paymentdto {
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

    public paymentdto(int amount, String confirmation, String accountNo) {
        this.amount = amount;
        this.confirmation = confirmation;
        this.accountNo = accountNo;
    }
}
