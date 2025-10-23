package com.example.miles_and_smiles.responseDtos;

public class NotableBenefitResponseDTO {
    private int benefitId;
    private String title;
    private String description;
    private int cardId;
    private String cardName;

    public NotableBenefitResponseDTO(int benefitId, String title, String description,
                                     int cardId, String cardName) {
        this.benefitId = benefitId;
        this.title = title;
        this.description = description;
        this.cardId = cardId;
        this.cardName = cardName;
    }

    public int getBenefitId() { return benefitId; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public int getCardId() { return cardId; }
    public String getCardName() { return cardName; }
}
