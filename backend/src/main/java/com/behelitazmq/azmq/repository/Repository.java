package com.behelitazmq.azmq.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.behelitazmq.azmq.model.Vlog;

public interface Repository extends JpaRepository <Vlog, Long>{
    List<Vlog> findAll();
    // List<Vlog> findByStatus(Boolean status);
    List<Vlog> findByTitleContaining(String title);
}
