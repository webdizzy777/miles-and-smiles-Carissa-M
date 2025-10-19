package com.example.miles_and_smiles.dtos;

import java.math.BigDecimal;

public class PointEarningResponseDTO {

    private int cardId;
    private CategoryDTO category;
    private BigDecimal multiplier;

    public PointEarningResponseDTO() {}

    public PointEarningResponseDTO(int cardId, CategoryDTO category, BigDecimal multiplier) {
        this.cardId = cardId;
        this.category = category;
        this.multiplier = multiplier;
    }

    public int getCardId() {
        return cardId;
    }

    public void setCardId(int cardId) {
        this.cardId = cardId;
    }

    public CategoryDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
    }

    public BigDecimal getMultiplier() {
        return multiplier;
    }

    public void setMultiplier(BigDecimal multiplier) {
        this.multiplier = multiplier;
    }
}
