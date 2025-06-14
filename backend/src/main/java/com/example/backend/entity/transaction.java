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

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private  user User;

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

    public user getUser() {
        return User;
    }

    public void setUser(user user) {
        User = user;
    }

    public transaction(Long id, transactiontype transactiontype, Integer amount, platform platform, user user) {
        this.id = id;
        this.transactiontype = transactiontype;
        this.amount = amount;
        this.platform = platform;
        User = user;
    }

    @Override
    public String toString() {
        return "transaction{" +
                "id=" + id +
                ", transactiontype=" + transactiontype +
                ", amount=" + amount +
                ", platform=" + platform +
                ", User=" + User +
                '}';
    }
}
