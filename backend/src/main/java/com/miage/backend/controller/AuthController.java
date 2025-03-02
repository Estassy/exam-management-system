package com.miage.backend.controller;

import com.miage.backend.dto.JwtResponse;
import com.miage.backend.dto.CreateUserRequest;
import com.miage.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody CreateUserRequest loginRequest) {
        String token = authService.login(loginRequest.getUsername(), loginRequest.getPassword());
        return ResponseEntity.ok(new JwtResponse(token));
    }
}
