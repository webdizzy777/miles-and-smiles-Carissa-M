package com.example.miles_and_smiles.controllers;

import com.example.miles_and_smiles.models.Category;
import com.example.miles_and_smiles.responseDtos.CategoryResponseDTO;
import com.example.miles_and_smiles.repositories.CategoryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public List<CategoryResponseDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(category -> new CategoryResponseDTO(
                        category.getCategoryId(),
                        category.getCategoryName()
                ))
                .toList();
    }

    @GetMapping("/{id}")
    public CategoryResponseDTO getCategoryById(@PathVariable int id) {
        return categoryRepository.findById(id)
                .map(category -> new CategoryResponseDTO(
                        category.getCategoryId(),
                        category.getCategoryName()
                ))
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + id));
    }

    @PostMapping
    public CategoryResponseDTO addCategory(@RequestBody CategoryResponseDTO dto) {
        if (categoryRepository.findByCategoryName(dto.getCategoryName()).isPresent()) {
            throw new RuntimeException("Category already exists: " + dto.getCategoryName());
        } else {
            Category category = categoryRepository.save(new Category(dto.getCategoryName()));
            return new CategoryResponseDTO(category.getCategoryId(), category.getCategoryName());
        }
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable int id) {

        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Category not found with ID: " + id);
        }

        categoryRepository.deleteById(id);
    }
}
