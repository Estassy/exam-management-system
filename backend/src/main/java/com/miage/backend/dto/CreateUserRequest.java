package com.miage.backend.dto;

import com.miage.backend.enums.Role;

import java.util.UUID;

public class CreateUserRequest {
    private String username;
    private String password;
    private Role role;
    private String firstName;
    private String lastName;
    private UUID promotion;

    public CreateUserRequest() {}

    public CreateUserRequest(String username, String password, Role role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    // Getters et Setters
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


    public UUID getPromotion() {
        return promotion;
    }

    public void setPromotion(UUID promotion) {
        this.promotion = promotion;
    }

}
