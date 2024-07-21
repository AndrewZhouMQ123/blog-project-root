package com.behelitazmq.azmq.controller;

import com.behelitazmq.azmq.FileUploadUtil;
import com.behelitazmq.azmq.model.File;
import com.behelitazmq.azmq.model.Vlog;
import com.behelitazmq.azmq.repository.FileRepository;
import com.behelitazmq.azmq.repository.Repository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api")
public class Controller {
    @Autowired
    Repository vlogRepository;
    @Autowired
    FileRepository fileRepository;

    Logger logger = LoggerFactory.getLogger(Controller.class);

    @GetMapping public ResponseEntity<String> getApiRoot() {
        return ResponseEntity.ok("Welcome to the API root!");
    }

    @GetMapping("/vlogs")
    public ResponseEntity<List<Vlog>> getAllVlogsAndFiles() {
        try {
            List<Vlog> vlogs = new ArrayList<>();
            vlogs.addAll(vlogRepository.findAll());
            if (vlogs.isEmpty()) {
                logger.info("no vlogs exist", vlogs);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            logger.info("vlogs loaded successfully", vlogs);
            return new ResponseEntity<>(vlogs, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            logger.error("failed to load vlogs because", e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/vlogsByTitle/")
    public ResponseEntity<List<Vlog>> getVlogByTitle(String title) {
        try {
            List<Vlog> vlogs = new ArrayList<>();
            vlogs.addAll(vlogRepository.findByTitleContaining(title));
            if (vlogs.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(vlogs, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @GetMapping("/vlogs/{id}")
//    public ResponseEntity<Vlog> getVlogById(@PathVariable("id") long id) {
//        Optional<Vlog> vlogData = vlogRepository.findById(id);
//
//        if (vlogData.isPresent()) {
//            return new ResponseEntity<>(vlogData.get(), HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }

    @Transactional
    @PostMapping("/vlogs")
    public ResponseEntity<Vlog> createVlog(@RequestParam("title") String title,
                                           @RequestParam("description") String description,
                                             @RequestParam(value = "file", required = false) MultipartFile file) {
        // Process the vlog data and file here
        try {
            // process vlog data
            Vlog toBeSave = new Vlog();
            toBeSave.setTitle(title);
            toBeSave.setDescription(description);
            toBeSave.setMessage("Vlog Saved");
            toBeSave.setSubmitted(true);

            // Check if file is provided
            if (file != null && !file.isEmpty()) {
                // process file data
                String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                String fileFormat = file.getContentType();
                byte[] data = file.getBytes();
                File toSaveFile = new File();
                toSaveFile.setFileName(fileName);
                toSaveFile.setFileFormat(fileFormat);
                toSaveFile.setData(data);
                toSaveFile.setFileSize(data.length);

                // map one-to-one relationship
                toBeSave.setFile(toSaveFile);
                toSaveFile.setVlog(toBeSave);

                // Save the file entity
                File newFile = fileRepository.save(toSaveFile);

                logger.info("successfully saved file", newFile);

                // save file to user-photos directory
//                String uploadDir = "user-photos/" + newFile.getId();
//                FileUploadUtil.saveFile(uploadDir, fileName, file);

                toBeSave.setUploaded(true);
            }

            // Save the vlog entity
            Vlog vlogged = vlogRepository.save(toBeSave);
            logger.info("successfully saved vlog", vlogged);
            return new ResponseEntity<>(toBeSave, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("vlog failed to upload because", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @PostMapping("/vlogs")
//    public ResponseEntity<Vlog> createVlog(@RequestBody Vlog vlog) {
//        try {
//            Vlog toBeSave = new Vlog();
//            toBeSave.setTitle(vlog.getTitle());
//            toBeSave.setDescription(vlog.getDescription());
//            Vlog vlogged = vlogRepository
//                    .save(toBeSave);
//            return new ResponseEntity<>(vlogged, HttpStatus.CREATED);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

//    @PutMapping("/vlogs/{id}")
//    public ResponseEntity<Vlog> updateVlog(@PathVariable("id") long id, @RequestBody Vlog vlog) {
//        Optional<Vlog> vlogData = vlogRepository.findById(id);
//
//        if (vlogData.isPresent()) {
//            Vlog vlogged = vlogData.get();
//            vlogged.setTitle(vlog.getTitle());
//            vlogged.setDescription(vlog.getDescription());
//            vlogged.setStatus(vlog.getStatus());
//            return new ResponseEntity<>(vlogRepository.save(vlogged), HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }

//    @DeleteMapping("/vlogs/{id}")
//    public ResponseEntity<HttpStatus> deleteVlog(@PathVariable("id") long id) {
//        try {
//            vlogRepository.deleteById(id);
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @DeleteMapping("/vlogs")
    public ResponseEntity<HttpStatus> deleteAllVlogs() {
        try {
            vlogRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @GetMapping("/vlogs/status")
//    public ResponseEntity<List<Vlog>> findByUserId() {
//        try {
//            List<Vlog> vlogs = vlogRepository.findByStatus(true);
//
//            if (vlogs.isEmpty()) {
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            }
//
//            return new ResponseEntity<>(vlogs, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
}
