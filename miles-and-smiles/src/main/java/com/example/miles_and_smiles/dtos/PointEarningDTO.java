package com.example.miles_and_smiles.dtos;

import java.math.BigDecimal;

public class PointEarningDTO {
    private int cardId;
    private int categoryId;
    private BigDecimal multiplier;

    public int getCardId() { return cardId; }
    public void setCardId(int cardId) { this.cardId = cardId; }

    public int getCategoryId() { return categoryId; }
    public void setCategoryId(int categoryId) { this.categoryId = categoryId; }

    public BigDecimal getMultiplier() { return multiplier; }
    public void setMultiplier(BigDecimal multiplier) { this.multiplier = multiplier; }
}
