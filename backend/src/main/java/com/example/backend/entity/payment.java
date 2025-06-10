package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
public class payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private paymenttype paymenttype;

    private Integer amount;

    @Enumerated(EnumType.STRING)
    private paymenttime paymenttime;

    @Enumerated(EnumType.STRING)
    private confirmationtype confirmationtype;

    private String confirmation;

    public payment() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public paymenttype getPaymenttype() {
        return paymenttype;
    }

    public void setPaymenttype(paymenttype paymenttype) {
        this.paymenttype = paymenttype;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public paymenttime getPaymenttime() {
        return paymenttime;
    }

    public void setPaymenttime(paymenttime paymenttime) {
        this.paymenttime = paymenttime;
    }

    public confirmationtype getConfirmationtype() {
        return confirmationtype;
    }

    public void setConfirmationtype(confirmationtype confirmationtype) {
        this.confirmationtype = confirmationtype;
    }

    public String getConfirmation() {
        return confirmation;
    }

    public void setConfirmation(String confirmation) {
        this.confirmation = confirmation;
    }

    public payment(Long id, paymenttype paymenttype, Integer amount, paymenttime paymenttime, confirmationtype confirmationtype, String confirmation) {
        this.id = id;
        this.paymenttype = paymenttype;
        this.amount = amount;
        this.paymenttime = paymenttime;
        this.confirmationtype = confirmationtype;
        this.confirmation = confirmation;
    }

    @Override
    public String toString() {
        return "payment{" +
                "id=" + id +
                ", paymenttype=" + paymenttype +
                ", amount=" + amount +
                ", paymenttime=" + paymenttime +
                ", confirmationtype=" + confirmationtype +
                ", confirmation='" + confirmation + '\'' +
                '}';
    }
}
