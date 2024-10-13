package com.behelitazmq.azmq.controller;

import com.behelitazmq.azmq.model.Vlog;
import com.behelitazmq.azmq.repository.Repository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api")
public class VlogController {
    @Autowired
    Repository vlogRepository;

    Logger logger = LoggerFactory.getLogger(VlogController.class);

    @GetMapping
    public ResponseEntity<String> getApiRoot() {
        return ResponseEntity.ok("Welcome to the API root!");
    }

    @GetMapping("/vlogs")
    public ResponseEntity<List<Vlog>> getAllVlogs() {
        try {
            List<Vlog> vlogs = new ArrayList<>();
            vlogs.addAll(vlogRepository.findAll());
            if (vlogs.isEmpty()) {
                logger.info("No vlogs exist");
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            logger.info("Vlogs loaded successfully");
            return new ResponseEntity<>(vlogs, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Failed to load vlogs", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/vlogsByTitle/")
    public ResponseEntity<List<Vlog>> getVlogByTitle(@RequestParam String title) {
        try {
            List<Vlog> vlogs = vlogRepository.findByTitleContaining(title);
            if (vlogs.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(vlogs, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error finding vlogs by title", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/vlogs")
    public ResponseEntity<Vlog> createVlog(@RequestParam("title") String title,
                                            @RequestParam("description") String description,
                                            @RequestParam("videoUrl") String videoUrl,
                                            @RequestParam(value = "thumbnailUrl", required = false) String thumbnailUrl) {
        try {
            Vlog newVlog = new Vlog();
            newVlog.setTitle(title);
            newVlog.setDescription(description);
            newVlog.setVideoUrl(videoUrl);
            newVlog.setThumbnailUrl(thumbnailUrl);

            Vlog savedVlog = vlogRepository.save(newVlog);
            logger.info("Successfully saved vlog");
            return new ResponseEntity<>(savedVlog, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Failed to create vlog", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/vlogs/{id}")
    public ResponseEntity<Vlog> updateVlog(@PathVariable("id") long id,
                                            @RequestParam("title") String title,
                                            @RequestParam("description") String description,
                                            @RequestParam("videoUrl") String videoUrl,
                                            @RequestParam(value = "thumbnailUrl", required = false) String thumbnailUrl) {
        Optional<Vlog> vlogData = vlogRepository.findById(id);

        if (vlogData.isPresent()) {
            Vlog existingVlog = vlogData.get();
            existingVlog.setTitle(title);
            existingVlog.setDescription(description);
            existingVlog.setVideoUrl(videoUrl);
            existingVlog.setThumbnailUrl(thumbnailUrl);

            Vlog updatedVlog = vlogRepository.save(existingVlog);
            logger.info("Successfully updated vlog with id: {}", id);
            return new ResponseEntity<>(updatedVlog, HttpStatus.OK);
        } else {
            logger.warn("Vlog with id: {} not found", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/vlogs")
    public ResponseEntity<HttpStatus> deleteAllVlogs() {
        try {
            vlogRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            logger.error("Failed to delete all vlogs", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}