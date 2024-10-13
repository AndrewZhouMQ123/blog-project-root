package com.behelitazmq.azmq.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.behelitazmq.azmq.model.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByUsernameContaining(String username);
    List<User> findByEmailContaining(String email);
}