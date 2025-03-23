package com.miage.backend.controller;

import com.miage.backend.dto.CreateUserRequest;
import com.miage.backend.entity.User;
import com.miage.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody CreateUserRequest createUserRequest) {
        User created = userService.createUser(
                createUserRequest.getUsername(),
                createUserRequest.getPassword(),
                createUserRequest.getRole(),
                createUserRequest.getFirstName(),
                createUserRequest.getLastName(),
                createUserRequest.getPromotion()
        );
        return ResponseEntity.ok(created);
    }


    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable UUID id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable UUID id, @RequestBody CreateUserRequest updateUserRequest) {
        User updated = userService.updateUser(id, updateUserRequest.getUsername(), updateUserRequest.getFirstName(), updateUserRequest.getLastName(), updateUserRequest.getPassword(), updateUserRequest.getRole(), updateUserRequest.getPromotion());
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
