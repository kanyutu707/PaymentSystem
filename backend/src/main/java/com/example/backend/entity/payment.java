package com.example.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

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

    @ColumnDefault("false")
    private boolean isCompleted;

    private String confirmation;


    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private  user sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    private user receiver;

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

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

    public user getSender() {
        return sender;
    }

    public void setSender(user sender) {
        this.sender = sender;
    }

    public user getReceiver() {
        return receiver;
    }

    public void setReceiver(user receiver) {
        this.receiver = receiver;
    }

    public payment(Long id, paymenttype paymenttype, Integer amount, paymenttime paymenttime, confirmationtype confirmationtype, boolean isCompleted, String confirmation, user sender, user receiver) {
        this.id = id;
        this.paymenttype = paymenttype;
        this.amount = amount;
        this.paymenttime = paymenttime;
        this.confirmationtype = confirmationtype;
        this.isCompleted = isCompleted;
        this.confirmation = confirmation;
        this.sender = sender;
        this.receiver = receiver;
    }

    @Override
    public String toString() {
        return "payment{" +
                "id=" + id +
                ", paymenttype=" + paymenttype +
                ", amount=" + amount +
                ", paymenttime=" + paymenttime +
                ", confirmationtype=" + confirmationtype +
                ", isCompleted=" + isCompleted +
                ", confirmation='" + confirmation + '\'' +
                ", sender=" + sender +
                ", receiver=" + receiver +
                '}';
    }
}
