package com.miage.backend.controller;

import com.miage.backend.dto.JwtResponse;
import com.miage.backend.dto.CreateUserRequest;
import com.miage.backend.entity.User;
import com.miage.backend.service.AuthService;
import com.miage.backend.service.UserService;
import com.miage.backend.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService; // Ajout du UserService pour récupérer le rôle

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody CreateUserRequest loginRequest) {
        try {
            String token = authService.login(loginRequest.getUsername(), loginRequest.getPassword());

            User user = userService.getUserByUsername(loginRequest.getUsername());
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Utilisateur introuvable");
            }

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", Map.of("id", user.getId(), "username", user.getUsername(), "role", user.getRole()));
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        }
    }

}

