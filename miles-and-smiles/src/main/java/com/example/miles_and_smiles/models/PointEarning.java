package com.example.miles_and_smiles.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "point_earning")
public class PointEarning {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "earning_id")
    private int earningId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "card_id", nullable = false)
    private Card card;

    @JsonIgnore
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

    public int getEarningId() {return earningId;}

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
