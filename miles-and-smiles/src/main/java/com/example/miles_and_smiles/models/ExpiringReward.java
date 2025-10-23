package com.example.miles_and_smiles.models;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "expiring_reward")
public class ExpiringReward {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reward_id;

    @ManyToOne
    @JoinColumn(name = "card_id", nullable = false)
    private Card card;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false)
    private LocalDate expirationDate;

    @Column(columnDefinition = "TEXT")
    private String details;

    public ExpiringReward(){

    }

    public ExpiringReward(String title, String details, LocalDate expirationDate, Card card) {
        this.title = title;
        this.details = details;
        this.expirationDate = expirationDate;
        this.card = card;
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

}
