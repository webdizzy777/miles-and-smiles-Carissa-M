package com.example.miles_and_smiles.responseDtos;

public class CategoryResponseDTO {
    private int categoryId;
    private String categoryName;

    public CategoryResponseDTO(int categoryId, String categoryName) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }

    public int getCategoryId() { return categoryId; }
    public String getCategoryName() { return categoryName; }
}
