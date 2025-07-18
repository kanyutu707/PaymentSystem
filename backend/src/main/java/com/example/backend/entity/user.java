package com.example.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
public class user implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(unique = true, length = 100, nullable = false)
    private  String email;

    private String firstName;
    private  String lastName;

    @Column(nullable = false)
    private String password;

    @CreationTimestamp
    @Column(updatable = false)
    private Date createdAt;

    @UpdateTimestamp
    private  Date updatedAt;

    @OneToMany(mappedBy = "sender")
    private Set<payment> sent;

    @OneToMany(mappedBy = "receiver")
    private Set<payment> received;

    @OneToMany(mappedBy = "User")
    private Set<transaction> User;

    private Long idNo;

    private String accountNo;

    private String phoneNo;


    public user() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Set<transaction> getUser() {
        return User;
    }

    public void setUser(Set<transaction> user) {
        User = user;
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

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public user(Long id, String email, String firstName, String lastName, String password, Date createdAt, Date updatedAt, Set<payment> sent, Set<payment> received, Set<transaction> user, Long idNo, String accountNo, String phoneNo) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.sent = sent;
        this.received = received;
        User = user;
        this.idNo = idNo;
        this.accountNo = accountNo;
        this.phoneNo = phoneNo;
    }

    @Override
    public String toString() {
        return "user{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", password='" + password + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", sent=" + sent +
                ", received=" + received +
                ", User=" + User +
                ", idNo=" + idNo +
                ", accountNo='" + accountNo + '\'' +
                ", phoneNo='" + phoneNo + '\'' +
                '}';
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
