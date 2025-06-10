package com.example.backend.repository;

import com.example.backend.entity.payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface paymentrepo extends JpaRepository<payment, Long> {
}
