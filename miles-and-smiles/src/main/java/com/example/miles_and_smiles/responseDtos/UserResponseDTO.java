package com.example.miles_and_smiles.responseDtos;

import java.time.LocalDateTime;

public class UserResponseDTO {
    private int userId;
    private String firstName;
    private String lastName;
    private String email;
    private LocalDateTime createdAt;
    private String message;

    public UserResponseDTO(int userId, String firstName, String lastName, String email, LocalDateTime createdAt) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.createdAt = createdAt;
    }

    //Constructor for login/register
    public UserResponseDTO(String message, String firstName, int userId) {
        this.message = message;
        this.firstName = firstName;
        this.userId = userId;
    }

    public int getUserId() { return userId; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public String getMessage() { return message; }
}