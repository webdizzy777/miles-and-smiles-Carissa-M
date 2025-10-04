package com.example.miles_and_smiles.models;

import jakarta.persistence.*;

@Entity
public class NotableBenefit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int benefit_id;

    @ManyToOne
    @JoinColumn(name = "card_id", nullable = false)
    private Card card;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    public NotableBenefit(){

    }

    public NotableBenefit(Card card, String title, String description) {
        this.card = card;
        this.title = title;
        this.description = description;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
