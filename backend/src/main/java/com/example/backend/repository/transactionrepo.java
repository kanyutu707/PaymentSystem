package com.example.backend.repository;

import com.example.backend.entity.transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface transactionrepo extends JpaRepository<transaction, Long> {
}
