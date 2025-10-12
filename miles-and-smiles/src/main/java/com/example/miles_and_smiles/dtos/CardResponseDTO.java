package com.example.miles_and_smiles.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;

public class CardResponseDTO {
    private int cardId;
    private String cardName;
    private LocalDate dateOpened;
    private BigDecimal fee;
    private BigDecimal apr;
    private BigDecimal creditLimit;
    private BigDecimal balance;
    private int dueDay;
    private String userName;
    private String userEmail;

    public CardResponseDTO(int cardId, String cardName, LocalDate dateOpened, BigDecimal fee, BigDecimal apr,
                           BigDecimal creditLimit, BigDecimal balance, int dueDay, String userName, String userEmail) {
        this.cardId = cardId;
        this.cardName = cardName;
        this.dateOpened = dateOpened;
        this.fee = fee;
        this.apr = apr;
        this.creditLimit = creditLimit;
        this.balance = balance;
        this.dueDay = dueDay;
        this.userName = userName;
        this.userEmail = userEmail;
    }

    public int getCardId() { return cardId; }
    public void setCardId(int cardId) { this.cardId = cardId; }

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

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
}
