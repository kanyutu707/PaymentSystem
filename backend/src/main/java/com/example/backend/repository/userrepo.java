package com.example.backend.repository;

import com.example.backend.entity.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface userrepo extends JpaRepository<user, Long> {
    Optional<user> findByEmail(String email);

    Optional<user> findByAccountNo(String accountNo);
}
