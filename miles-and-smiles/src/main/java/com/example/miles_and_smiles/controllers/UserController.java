package com.example.miles_and_smiles.controllers;

import com.example.miles_and_smiles.models.User;
import com.example.miles_and_smiles.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

// handle requests for users
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;

    // inject the UserRepository so we can talk to the database
    public UserController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    // get all users from the database
    @GetMapping
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    // get one user by id from /users/id
    @GetMapping("/{id}")
    public User getUser(@PathVariable int id){
        return userRepository.findById(id).orElse(null);
    }

    // add a new user to the database
    @PostMapping
    public User addUser(@RequestBody User user){
        return userRepository.save(user);
    }

    // update a user when the id is received at /users/id
    // use Optional to only run if the user with that id is found
    @PutMapping("/{id}")
    public Optional<User> updateUser(@PathVariable int id, @RequestBody User user){
        return userRepository.findById(id).map(updatedUser -> {
            updatedUser.setFirstName(user.getFirstName());
            updatedUser.setLastName(user.getLastName());
            updatedUser.setEmail(user.getEmail());
            updatedUser.setPassword(user.getPassword());
            return userRepository.save(updatedUser);
        });
    }

    // delete the user by id received at /users/id
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id){
        userRepository.deleteById(id);
    }
}