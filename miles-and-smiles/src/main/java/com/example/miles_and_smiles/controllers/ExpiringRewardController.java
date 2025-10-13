package com.example.miles_and_smiles.controllers;

import com.example.miles_and_smiles.models.Card;
import com.example.miles_and_smiles.models.ExpiringReward;
import com.example.miles_and_smiles.models.User;
import com.example.miles_and_smiles.repositories.CardRepository;
import com.example.miles_and_smiles.repositories.ExpiringRewardRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ExpiringRewards")
public class ExpiringRewardController {

    private final ExpiringRewardRepository expiringRewardRepository;
    private final CardRepository cardRepository;

    public ExpiringRewardController(ExpiringRewardRepository expiringRewardRepository, CardRepository cardRepository){
        this.expiringRewardRepository = expiringRewardRepository;
        this.cardRepository = cardRepository;
    }

    @GetMapping
    public List<ExpiringReward> getAllExpiringRewards(){
        return expiringRewardRepository.findAll();
    }

    @GetMapping("/card/{cardId}")
    public List<ExpiringReward> getExpiringRewardsByCard(@PathVariable int cardId) {
        return expiringRewardRepository.findByCardCardId(cardId);
    }

    @GetMapping("/user/{userId}")
    public List<ExpiringReward> getExpiringRewardsByUser(@PathVariable int userId){
        return  expiringRewardRepository.findByCardUserUserId((userId));
    }

    @PostMapping("/card/{cardId}")
    public ExpiringReward addExpiringReward(@PathVariable int cardId, @RequestBody ExpiringReward expiringReward) {

        // Find the card in the database by its ID
        Card card = cardRepository.findById(cardId)
                .orElseThrow(() -> new RuntimeException("Card not found with ID: " + cardId));

        // Attach that card to the new reward
        expiringReward.setCard(card);

        // Save the new reward to the database
        return expiringRewardRepository.save(expiringReward);
    }


    @PutMapping("/{rewardId}")
    public ExpiringReward updateExpiringReward(@PathVariable int rewardId, @RequestBody ExpiringReward rewardDetails) {
        ExpiringReward existingReward = expiringRewardRepository.findById(rewardId)
                .orElseThrow(() -> new RuntimeException("Expiring Reward not found with ID: " + rewardId));

        existingReward.setTitle(rewardDetails.getTitle());
        existingReward.setDetails(rewardDetails.getDetails());
        existingReward.setExpirationDate(rewardDetails.getExpirationDate());

        return expiringRewardRepository.save(existingReward);
    }

    @DeleteMapping("/{rewardId}")
    public void deleteExpiringReward(@PathVariable int rewardId){
        expiringRewardRepository.deleteById(rewardId);
    }


}
