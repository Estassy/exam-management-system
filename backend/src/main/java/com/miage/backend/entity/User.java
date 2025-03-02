package com.miage.backend.entity;

import jakarta.persistence.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.UUID;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String username;
    private String password;
    private String role;

    @Transient // Exclut du mapping Hibernate, mais injecté par Spring
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User() {}

    public User(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    @PrePersist
    @PreUpdate
    public void encodePasswordIfNeeded() {
        if (!this.password.startsWith("$2a$")) { // Vérifie si déjà encodé
            this.password = passwordEncoder.encode(this.password);
        }
    }

    // Getters et Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
