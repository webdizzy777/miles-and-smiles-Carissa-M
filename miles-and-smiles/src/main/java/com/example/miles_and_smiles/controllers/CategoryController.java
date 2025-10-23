package com.example.miles_and_smiles.controllers;

import com.example.miles_and_smiles.responseDtos.CategoryResponseDTO;
import com.example.miles_and_smiles.repositories.CategoryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    // Inject the CategoryRepository to talk to the database
    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // Handle GET requests to /categories
    @GetMapping
    public List<CategoryResponseDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(category -> new CategoryResponseDTO(
                        category.getCategoryId(),
                        category.getCategoryName()
                ))
                .toList();
    }
}
