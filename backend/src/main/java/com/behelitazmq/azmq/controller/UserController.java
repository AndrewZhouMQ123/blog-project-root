package com.behelitazmq.azmq.controller;

import com.behelitazmq.azmq.model.User;
import com.behelitazmq.azmq.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(@RequestParam(required = false) String email) {
        try {
            List<User> users = new ArrayList<>();

            if (email == null) {
                userRepository.findAll().forEach(users::add);
            }
            else {
                userRepository.findByEmailContaining(email).forEach(users::add);
            }
            if (users.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            String email = user.getEmail();
            List<User> userList = userRepository.findByEmailContaining(email);
            if (userList.isEmpty()) {
                User tobeSave = new User();
                tobeSave.setFirstName(user.getFirstName());
                tobeSave.setLastName(user.getLastName());
                tobeSave.setUsername(user.getUsername());
                tobeSave.setPassword(user.getPassword());
                tobeSave.setEmail(user.getEmail());
                User newUser = userRepository.save(tobeSave);
                newUser.setMessage("You registered successfully!");
                return new ResponseEntity<>(newUser, HttpStatus.OK);
            } else {
                User duplicate = new User();
                duplicate.setMessage("Email duplicate");
                duplicate.setFirstName(user.getFirstName());
                duplicate.setLastName(user.getLastName());
                duplicate.setUsername(user.getUsername());
                duplicate.setPassword(user.getPassword());
                duplicate.setEmail(user.getEmail());
                return new ResponseEntity<>(duplicate, HttpStatus.OK);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") long id, @RequestBody User user) {
        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent()) {
            User user1 = userData.get();
            user1.setFirstName(user.getFirstName());
            user1.setLastName(user.getLastName());
            user1.setUsername(user.getUsername());
            user1.setPassword(user.getPassword());
            user1.setEmail(user.getEmail());
            return new ResponseEntity<>(userRepository.save(user1), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/userRepo/{id}")
    public ResponseEntity<HttpStatus> deleteVlog(@PathVariable("id") long id) {
        try {
            userRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/userRepo")
    public ResponseEntity<HttpStatus> deleteAllVlogs() {
        try {
            userRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/userRepo/userId")
    public ResponseEntity<List<User>> findByUserId(String username) {
        try {
            List<User> users = userRepository.findByUsernameContaining(username);

            if (users.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
