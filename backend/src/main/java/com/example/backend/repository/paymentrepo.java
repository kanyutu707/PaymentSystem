package com.example.backend.repository;

import com.example.backend.entity.payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface paymentrepo extends JpaRepository<payment, Long> {
}
