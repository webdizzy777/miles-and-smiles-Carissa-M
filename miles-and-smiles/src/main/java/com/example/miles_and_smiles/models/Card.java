package com.example.miles_and_smiles.models;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "card")
public class Card {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name = "card_id")
   private int cardId;

   @ManyToOne
   @JoinColumn(name = "user_id", nullable = false)
   private User user;

   @Column(nullable = false, length = 100)
   private String cardName;

   private LocalDate dateOpened;

   @Column(precision = 5, scale = 2)
   private BigDecimal fee;

   @Column(precision = 5, scale = 2)
   private BigDecimal apr;

   @Column(precision = 10, scale = 2)
   private BigDecimal creditLimit;

   @Column(precision = 10, scale = 2)
   private BigDecimal balance;

   private int dueDay;

   public Card() {

   }

   public Card(User user, String cardName, LocalDate dateOpened, BigDecimal apr, BigDecimal fee,
               BigDecimal creditLimit, BigDecimal balance, int dueDay) {
      this.user = user;
      this.cardName = cardName;
      this.dateOpened = dateOpened;
      this.apr = apr;
      this.fee = fee;
      this.creditLimit = creditLimit;
      this.balance = balance;
      this.dueDay = dueDay;
   }

   public String getCardName() {
      return cardName;
   }

   public void setCardName(String cardName) {
      this.cardName = cardName;
   }

   public LocalDate getDateOpened() {
      return dateOpened;
   }

   public void setDateOpened(LocalDate dateOpened) {
      this.dateOpened = dateOpened;
   }

   public BigDecimal getFee() {
      return fee;
   }

   public void setFee(BigDecimal fee) {
      this.fee = fee;
   }

   public BigDecimal getApr() {
      return apr;
   }

   public void setApr(BigDecimal apr) {
      this.apr = apr;
   }

   public BigDecimal getCreditLimit() {
      return creditLimit;
   }

   public void setCreditLimit(BigDecimal creditLimit) {
      this.creditLimit = creditLimit;
   }

   public BigDecimal getBalance() {
      return balance;
   }

   public void setBalance(BigDecimal balance) {
      this.balance = balance;
   }

   public int getDueDay() {
      return dueDay;
   }

   public void setDueDay(int dueDay) {
      this.dueDay = dueDay;
   }

   public User getUser() {
      return user;
   }

   public void setUser(User user) {
      this.user = user;
   }

   public int getCardId() {
      return cardId;
   }

}