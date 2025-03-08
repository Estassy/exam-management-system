package com.miage.backend.exception;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ErrorResponse {

    // Getters et Setters
    private int status;
    private String message;
    private String details;

    public ErrorResponse(int status, String message, String details) {
        this.status = status;
        this.message = message;
        this.details = details;
    }

}
