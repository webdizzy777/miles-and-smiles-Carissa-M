package com.example.miles_and_smiles.models;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Card {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private int card_id;

   @ManyToOne
   @JoinColumn(name = "user_id", nullable = false)
   private User user;

   @Column(nullable = false, length = 100)
   private String cardName;

   private LocalDate dateOpened;
   private double fee;
   private double apr;
   private double creditLimit;
   private double balance;
   private int dueDay;

   public Card() {

   }

   public Card(User user, String cardName, LocalDate dateOpened, double apr, double fee,
               double creditLimit, double balance, int dueDay) {
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

   public double getFee() {
      return fee;
   }

   public void setFee(double fee) {
      this.fee = fee;
   }

   public double getApr() {
      return apr;
   }

   public void setApr(double apr) {
      this.apr = apr;
   }

   public double getCreditLimit() {
      return creditLimit;
   }

   public void setCreditLimit(double creditLimit) {
      this.creditLimit = creditLimit;
   }

   public double getBalance() {
      return balance;
   }

   public void setBalance(double balance) {
      this.balance = balance;
   }

   public int getDueDay() {
      return dueDay;
   }

   public void setDueDay(int dueDay) {
      this.dueDay = dueDay;
   }

}