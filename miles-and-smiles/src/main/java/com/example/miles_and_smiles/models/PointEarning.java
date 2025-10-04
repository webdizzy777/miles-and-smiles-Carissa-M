package com.example.miles_and_smiles.models;

import jakarta.persistence.*;

@Entity
public class PointEarning {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int earning_id;

    @ManyToOne
    @JoinColumn(name = "card_id", nullable = false)
    private Card card;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    private double multiplier;

    public PointEarning(){

    }

    public PointEarning(Card card, Category category, double multiplier) {
        this.card = card;
        this.category = category;
        this.multiplier = multiplier;
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public double getMultiplier() {
        return multiplier;
    }

    public void setMultiplier(double multiplier) {
        this.multiplier = multiplier;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
    
}
