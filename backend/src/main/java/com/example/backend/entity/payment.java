package com.example.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

@Entity
public class payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    private Integer amount;

    @Enumerated(EnumType.STRING)
    private paymenttime paymenttime;

    @Enumerated(EnumType.STRING)
    private confirmationtype confirmationtype;

    @ColumnDefault("false")
    private boolean isCompleted;

    private String confirmation;


    @ColumnDefault("'bydate'")
    private String senderCode;

    @ColumnDefault("'bydate'")
    private String receiverCode;



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

    public String getSenderCode() {
        return senderCode;
    }

    public void setSenderCode(String senderCode) {
        this.senderCode = senderCode;
    }

    public String getReceiverCode() {
        return receiverCode;
    }

    public void setReceiverCode(String receiverCode) {
        this.receiverCode = receiverCode;
    }

    public payment(Long id, Integer amount, paymenttime paymenttime, confirmationtype confirmationtype, boolean isCompleted, String confirmation, String senderCode, String receiverCode, user sender, user receiver) {
        this.id = id;
        this.amount = amount;
        this.paymenttime = paymenttime;
        this.confirmationtype = confirmationtype;
        this.isCompleted = isCompleted;
        this.confirmation = confirmation;
        this.senderCode = senderCode;
        this.receiverCode = receiverCode;
        this.sender = sender;
        this.receiver = receiver;
    }

    @Override
    public String toString() {
        return "payment{" +
                "id=" + id +
                ", amount=" + amount +
                ", paymenttime=" + paymenttime +
                ", confirmationtype=" + confirmationtype +
                ", isCompleted=" + isCompleted +
                ", confirmation='" + confirmation + '\'' +
                ", senderCode='" + senderCode + '\'' +
                ", receiverCode='" + receiverCode + '\'' +
                ", sender=" + sender +
                ", receiver=" + receiver +
                '}';
    }
}
