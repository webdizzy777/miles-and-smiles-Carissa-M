package com.example.miles_and_smiles.responseDtos;

import com.example.miles_and_smiles.dtos.CategoryDTO;
import java.math.BigDecimal;

public class PointEarningResponseDTO {
    private int earningId;
    private int cardId;
    private CategoryDTO category;
    private BigDecimal multiplier;

    public PointEarningResponseDTO(int earningId, int cardId, CategoryDTO category, BigDecimal multiplier) {
        this.earningId = earningId;
        this.cardId = cardId;
        this.category = category;
        this.multiplier = multiplier;
    }

    public int getEarningId() { return earningId; }
    public int getCardId() { return cardId; }
    public CategoryDTO getCategory() { return category; }
    public BigDecimal getMultiplier() { return multiplier; }
}
