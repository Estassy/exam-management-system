package com.miage.backend.dto;

import com.miage.backend.enums.Role;
import java.util.UUID;

public class UserResponse {
    private UUID id;
    private String username;
    private Role role;

    public UserResponse(UUID id, String username, Role role) {
        this.id = id;
        this.username = username;
        this.role = role;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
