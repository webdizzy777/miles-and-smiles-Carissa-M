package com.example.miles_and_smiles.models;

import jakarta.persistence.*;

import java.math.BigDecimal;

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

    @Column(precision = 5, scale = 2, nullable = false)
    private BigDecimal multiplier;

    public PointEarning(){

    }

    public PointEarning(Card card, Category category, BigDecimal multiplier) {
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

    public BigDecimal getMultiplier() {
        return multiplier;
    }

    public void setMultiplier(BigDecimal multiplier) {
        this.multiplier = multiplier;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

}
