package com.example.miles_and_smiles.responseDtos;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ExpiringRewardResponseDTO {

    // Reward Info
    private String title;
    private String details;
    private LocalDate expirationDate;

    // Card Info
    private int cardId;
    private String cardName;
    private LocalDate dateOpened;
    private BigDecimal fee;
    private BigDecimal apr;
    private BigDecimal creditLimit;
    private BigDecimal balance;
    private int dueDay;

    // User Info
    private String userEmail;
    private String firstName;
    private String lastName;

    // Default constructor
    public ExpiringRewardResponseDTO() {}

    // Full constructor
    public ExpiringRewardResponseDTO(
            int cardId,
            String title,
            LocalDate expirationDate,
            String details,
            String cardName,
            LocalDate dateOpened,
            BigDecimal fee,
            BigDecimal apr,
            BigDecimal balance,
            BigDecimal creditLimit,
            int dueDay,
            String userEmail,
            String firstName,
            String lastName
    ) {
        this.cardId = cardId;
        this.title = title;
        this.expirationDate = expirationDate;
        this.details = details;
        this.cardName = cardName;
        this.dateOpened = dateOpened;
        this.fee = fee;
        this.apr = apr;
        this.balance = balance;
        this.creditLimit = creditLimit;
        this.dueDay = dueDay;
        this.userEmail = userEmail;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // Getters & Setters
    public int getCardId() { return cardId; }
    public void setCardId(int cardId) { this.cardId = cardId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public LocalDate getExpirationDate() { return expirationDate; }
    public void setExpirationDate(LocalDate expirationDate) { this.expirationDate = expirationDate; }

    public String getCardName() { return cardName; }
    public void setCardName(String cardName) { this.cardName = cardName; }

    public LocalDate getDateOpened() { return dateOpened; }
    public void setDateOpened(LocalDate dateOpened) { this.dateOpened = dateOpened; }

    public BigDecimal getFee() { return fee; }
    public void setFee(BigDecimal fee) { this.fee = fee; }

    public BigDecimal getApr() { return apr; }
    public void setApr(BigDecimal apr) { this.apr = apr; }

    public BigDecimal getCreditLimit() { return creditLimit; }
    public void setCreditLimit(BigDecimal creditLimit) { this.creditLimit = creditLimit; }

    public BigDecimal getBalance() { return balance; }
    public void setBalance(BigDecimal balance) { this.balance = balance; }

    public int getDueDay() { return dueDay; }
    public void setDueDay(int dueDay) { this.dueDay = dueDay; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
}