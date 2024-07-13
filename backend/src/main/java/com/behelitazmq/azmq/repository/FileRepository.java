package com.behelitazmq.azmq.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.behelitazmq.azmq.model.File;
import java.util.List;

public interface FileRepository extends JpaRepository <File, Long> {
    List<File> findAll();
}
