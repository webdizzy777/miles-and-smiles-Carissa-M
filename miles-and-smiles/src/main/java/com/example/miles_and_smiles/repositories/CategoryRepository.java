package com.example.miles_and_smiles.repositories;

import com.example.miles_and_smiles.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
