package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
public class transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private  transactiontype transactiontype;

    private Integer amount;

    @Enumerated(EnumType.STRING)
    private platform platform;

    public transaction() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public transactiontype getTransactiontype() {
        return transactiontype;
    }

    public void setTransactiontype(transactiontype transactiontype) {
        this.transactiontype = transactiontype;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public platform getPlatform() {
        return platform;
    }

    public void setPlatform(platform platform) {
        this.platform = platform;
    }

    public transaction(Long id, transactiontype transactiontype, Integer amount, platform platform) {
        this.id = id;
        this.transactiontype = transactiontype;
        this.amount = amount;
        this.platform = platform;
    }

    @Override
    public String toString() {
        return "transaction{" +
                "id=" + id +
                ", transactiontype=" + transactiontype +
                ", amount=" + amount +
                ", platform=" + platform +
                '}';
    }
}
