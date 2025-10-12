package com.example.miles_and_smiles.repositories;

import com.example.miles_and_smiles.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
