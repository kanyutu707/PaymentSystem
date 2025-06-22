package com.example.backend.repository;

import com.example.backend.entity.payment;
import com.example.backend.entity.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface paymentrepo extends JpaRepository<payment, Long> {
    List<payment> findBysender(user userFound);

    List<payment> findByreceiver(user userFound);
}
