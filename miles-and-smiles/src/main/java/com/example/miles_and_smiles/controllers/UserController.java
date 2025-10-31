package com.example.miles_and_smiles.controllers;

import com.example.miles_and_smiles.dtos.UserDTO;
import com.example.miles_and_smiles.models.User;
import com.example.miles_and_smiles.repositories.UserRepository;
import com.example.miles_and_smiles.responseDtos.UserResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    public UserController(UserRepository userRepository, BCryptPasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    @GetMapping
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserResponseDTO(
                        user.getUserId(),
                        user.getFirstName(),
                        user.getLastName(),
                        user.getEmail(),
                        user.getCreatedAt()
                ))
                .toList();
    }

    @GetMapping("/{id}")
    public UserResponseDTO getUser(@PathVariable int id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

        return new UserResponseDTO(
                user.getUserId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getCreatedAt()
        );
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDTO> loginUser(@RequestBody UserDTO dto) {

        // Look up a user by email, if no user found, immediately stop and throw an error
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Email not found"));

        // Check if plain text password from the request matches the hashed password stored in the database
        if (encoder.matches(dto.getPassword(), user.getPassword())) {

            UserResponseDTO response = new UserResponseDTO(
                    "Login successful!",
                    user.getFirstName(),
                    user.getUserId()
            );
            return ResponseEntity.ok(response);

        } else {
            //If the password does not match, send back a 401 Unauthorized response.
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new UserResponseDTO("Invalid email or password", null, 0));
        }
    }

    @PostMapping("/register")
    // Return an HTTP response
    public ResponseEntity<UserResponseDTO>registerUser(@RequestBody UserDTO dto) {

        // Check if a user with the same email already exists in the database
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            // If user already exists, return a 400 Bad Request with a message
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new UserResponseDTO(
                            "User with this email already exists. Please login.",
                            null,
                            0
                    ));
        }

        // Encrypt the plain text password before saving to the database
        String encodedPassword = encoder.encode(dto.getPassword());

        // Create a new User object using the data from the request body
        User newUser = new User(
                dto.getFirstName(),
                dto.getLastName(),
                dto.getEmail(),
                encodedPassword
        );

        // Save the new user record to the database
        User savedUser = userRepository.save(newUser);

        // Return a success response with selected user details
        UserResponseDTO response = new UserResponseDTO(
                "User registered successfully!",
                savedUser.getFirstName(),
                savedUser.getUserId()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public UserResponseDTO updateUser(@PathVariable int id, @RequestBody UserDTO dto) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

        existingUser.setFirstName(dto.getFirstName());
        existingUser.setLastName(dto.getLastName());
        existingUser.setEmail(dto.getEmail());

        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            existingUser.setPassword(encoder.encode(dto.getPassword()));
        }

        User updatedUser = userRepository.save(existingUser);

        return new UserResponseDTO(
                updatedUser.getUserId(),
                updatedUser.getFirstName(),
                updatedUser.getLastName(),
                updatedUser.getEmail(),
                updatedUser.getCreatedAt()
        );
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id) {

        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with ID: " + id);
        }

        userRepository.deleteById(id);
    }
}
