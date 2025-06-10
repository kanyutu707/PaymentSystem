package com.example.backend.repository;

import com.example.backend.entity.transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface transactionrepo extends JpaRepository<transaction, Long> {
}
