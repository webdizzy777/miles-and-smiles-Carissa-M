package com.example.miles_and_smiles.dtos;

public class NotableBenefitDTO {

    private int cardId;
    private String title;
    private String description;

    public NotableBenefitDTO() {
    }

    public NotableBenefitDTO(int cardId, String title, String description) {
        this.cardId = cardId;
        this.title = title;
        this.description = description;
    }

    public int getCardId() {
        return cardId;
    }

    public void setCardId(int cardId) {
        this.cardId = cardId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}