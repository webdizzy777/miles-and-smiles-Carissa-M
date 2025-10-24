package com.example.miles_and_smiles.responseDtos;

import java.math.BigDecimal;

public class PointEarningResponseDTO {
    private int earningId;
    private int cardId;
    private int categoryId;
    private String categoryName;
    private BigDecimal multiplier;

    public PointEarningResponseDTO(int earningId, int cardId, int categoryId, String categoryName, BigDecimal multiplier) {
        this.earningId = earningId;
        this.cardId = cardId;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.multiplier = multiplier;
    }

    public int getEarningId() { return earningId; }
    public int getCardId() { return cardId; }
    public int getCategoryId() { return categoryId; }
    public String getCategoryName() { return categoryName; }
    public BigDecimal getMultiplier() { return multiplier; }
}
