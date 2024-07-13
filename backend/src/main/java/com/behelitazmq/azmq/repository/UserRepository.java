package com.behelitazmq.azmq.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.behelitazmq.azmq.model.User;

public interface UserRepository extends JpaRepository <User, Long> {
    List<User> findByUsernameContaining(String username);
    List<User> findByEmailContaining(String email);
}
