package com.example.miles_and_smiles.dtos;

import java.time.LocalDate;

public class ExpiringRewardDTO {
    private int cardId;
    private String title;
    private String details;
    private LocalDate expirationDate;

    public int getCardId() { return cardId; }
    public void setCardId(int cardId) { this.cardId = cardId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public LocalDate getExpirationDate() { return expirationDate; }
    public void setExpirationDate(LocalDate expirationDate) { this.expirationDate = expirationDate; }
}
