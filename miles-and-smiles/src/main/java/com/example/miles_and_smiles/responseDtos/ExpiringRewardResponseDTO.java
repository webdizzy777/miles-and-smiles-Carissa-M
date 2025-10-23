package com.example.miles_and_smiles.responseDtos;

import java.time.LocalDate;

public class ExpiringRewardResponseDTO {
    private int rewardId;
    private String title;
    private String details;
    private LocalDate expirationDate;
    private int cardId;
    private String cardName;

    public ExpiringRewardResponseDTO(int rewardId, String title, String details,
                                     LocalDate expirationDate, int cardId, String cardName) {
        this.rewardId = rewardId;
        this.title = title;
        this.details = details;
        this.expirationDate = expirationDate;
        this.cardId = cardId;
        this.cardName = cardName;
    }

    public int getRewardId() { return rewardId; }
    public String getTitle() { return title; }
    public String getDetails() { return details; }
    public LocalDate getExpirationDate() { return expirationDate; }
    public int getCardId() { return cardId; }
    public String getCardName() { return cardName; }
}
