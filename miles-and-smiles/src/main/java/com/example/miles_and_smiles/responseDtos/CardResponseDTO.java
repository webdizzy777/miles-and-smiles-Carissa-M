package com.example.miles_and_smiles.responseDtos;

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
    private int userId;

    public CardResponseDTO(int cardId, String cardName, LocalDate dateOpened, BigDecimal fee,
                           BigDecimal apr, BigDecimal creditLimit, BigDecimal balance,
                           int dueDay, int userId) {
        this.cardId = cardId;
        this.cardName = cardName;
        this.dateOpened = dateOpened;
        this.fee = fee;
        this.apr = apr;
        this.creditLimit = creditLimit;
        this.balance = balance;
        this.dueDay = dueDay;
        this.userId = userId;
    }

    public int getCardId() { return cardId; }
    public String getCardName() { return cardName; }
    public LocalDate getDateOpened() { return dateOpened; }
    public BigDecimal getFee() { return fee; }
    public BigDecimal getApr() { return apr; }
    public BigDecimal getCreditLimit() { return creditLimit; }
    public BigDecimal getBalance() { return balance; }
    public int getDueDay() { return dueDay; }
    public int getUserId() { return userId; }
}
