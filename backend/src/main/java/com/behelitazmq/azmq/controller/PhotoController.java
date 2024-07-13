//package com.behelitazmq.azmq.controller;
//
//import com.behelitazmq.azmq.FileUploadUtil;
//import com.behelitazmq.azmq.model.File;
//import com.behelitazmq.azmq.repository.FileRepository;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.util.StringUtils;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//@CrossOrigin(origins = "http://localhost:3000")
//@RestController
//@RequestMapping("/api")
//public class PhotoController {
//    @Autowired
//    FileRepository fileRepository;
//
//    @GetMapping("/download/{id}")
//    public void getPhotoById(@PathVariable("id") long id, HttpServletResponse response) throws ServletException, IOException{
//        Optional<File> photoData = fileRepository.findById(id);
//
//        if (photoData.isPresent()) {
//            File file = photoData.get();
//            response.setContentType("image/jpeg, image/jpg, image/png, image/gif");
//            response.getOutputStream().write(file.getData());
//            response.getOutputStream().close();
//        }
//    }
//
//    @GetMapping("/download")
//    public List<String> getAllPhotoPath() {
//        List<String> imageList = new ArrayList<String>();
//        for (File file : fileRepository.findAll()) {
//            String imagePath = file.getPhotosImagePath();
//            imageList.add(imagePath);
//        }
//
//        return imageList;
//    }
//
//    @GetMapping("/id")
//    public List<Long> getAllPhotoId() {
//        List<Long> idList = new ArrayList<Long>();
//        for (File file : fileRepository.findAll()) {
//            Long id = file.getId();
//            idList.add(id);
//        }
//
//        return idList;
//    }
//
//    @PostMapping("/upload")
//    public ResponseEntity<File> createPhoto(@RequestParam("file") MultipartFile file)
//            throws IOException {
//        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
//        String fileFormat = file.getContentType();
//        byte[] data = file.getBytes();
//        File toSaveFile = new File();
//        toSaveFile.setFileName(fileName);
//        toSaveFile.setFileFormat(fileFormat);
//        toSaveFile.setData(data);
//        File newFile = fileRepository.save(toSaveFile);
//        String uploadDir = "user-photos/" + newFile.getId();
//        FileUploadUtil.saveFile(uploadDir, fileName, file);
//        return new ResponseEntity<>(newFile, HttpStatus.OK);
//    }
//}
