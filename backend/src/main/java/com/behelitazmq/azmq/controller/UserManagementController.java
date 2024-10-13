package com.behelitazmq.azmq.controller;

import com.behelitazmq.azmq.model.User;
import com.behelitazmq.azmq.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserManagementController {
    @Autowired
    UserRepository userRepository;

    Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(@RequestParam(required = false) String email) {
        try {
            List<User> users = (email == null) ? userRepository.findAll() : userRepository.findByEmailContaining(email);
            return users.isEmpty() ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            if (userRepository.findByEmailContaining(user.getEmail()).isEmpty()) {
                User newUser = userRepository.save(new User(
                    user.getFirstName(), user.getLastName(), user.getUsername(), user.getPassword(), user.getEmail()
                ));
                logger.info("Successfully saved user: {}", newUser);
                return new ResponseEntity<>(newUser, HttpStatus.CREATED);
            } else {
                logger.info("Duplicate email for user: {}", user);
                return new ResponseEntity<>(HttpStatus.CONFLICT); // 409 Conflict
            }
        } catch (Exception e) {
            logger.error("Failed to save user", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") long id, @RequestBody User user) {
        return userRepository.findById(id)
            .map(existingUser -> {
                existingUser.updateDetails(user);
                return new ResponseEntity<>(userRepository.save(existingUser), HttpStatus.OK);
            })
            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") long id) {
        try {
            userRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/users")
    public ResponseEntity<HttpStatus> deleteAllUsers() {
        try {
            userRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/users/search")
    public ResponseEntity<List<User>> findByUsername(@RequestParam String username) {
        try {
            List<User> users = userRepository.findByUsernameContaining(username);
            return users.isEmpty() ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
