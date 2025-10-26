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

//    @PostMapping("/login")
//    public String loginUser(@RequestBody UserDTO dto) {
//        // Find user by email
//        User user = userRepository.findByEmail(dto.getEmail())
//                .orElseThrow(() -> new RuntimeException("Email is not registered. Please create an account."));
//
//        // Compare raw password with hashed password in DB
//        if (encoder.matches(dto.getPassword(), user.getPassword())) {
//            return "Login successful! Welcome " + user.getFirstName() + "!";
//        } else {
//            throw new RuntimeException("Invalid email or password");
//        }
//    }

    @PostMapping("/login")
    // Return an HTTP response with a JSON body
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody UserDTO dto) {

        // Look up a user by email, if no user found, immediately stop and throw an error
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Email not found"));

        // Check if plain text password from the request matches the hashed password stored in the database
        if (encoder.matches(dto.getPassword(), user.getPassword())) {

            //If the passwords match, build a JSON response using Map.of
            return ResponseEntity.ok(Map.of(
                    "message", "Login successful!",
                    "firstName", user.getFirstName()
            ));

        } else {
            //If the password does not match, send back a 401 Unauthorized response with a JSON message.
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid email or password"));
        }
    }


    @PostMapping("register")
    public UserResponseDTO addUser(@RequestBody UserDTO dto) {

        String encodedPassword = encoder.encode(dto.getPassword());

        User user = new User(
                dto.getFirstName(),
                dto.getLastName(),
                dto.getEmail(),
                encodedPassword
        );
        User savedUser = userRepository.save(user);

        return new UserResponseDTO(
                savedUser.getUserId(),
                savedUser.getFirstName(),
                savedUser.getLastName(),
                savedUser.getEmail(),
                savedUser.getCreatedAt()
        );
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
