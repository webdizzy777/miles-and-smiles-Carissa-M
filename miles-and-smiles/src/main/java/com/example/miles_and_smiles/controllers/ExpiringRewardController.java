package com.example.miles_and_smiles.controllers;

import com.example.miles_and_smiles.dtos.ExpiringRewardResponseDTO;
import com.example.miles_and_smiles.models.Card;
import com.example.miles_and_smiles.models.ExpiringReward;
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
    public List<ExpiringRewardResponseDTO> getAllExpiringRewards() {
        // Find all cards in the database, then process them one by one with stream,
        // map each card into a CardResponseDTO, and collect them back into a list
        return expiringRewardRepository.findAll().stream()
                .map(expiringReward -> new ExpiringRewardResponseDTO(
                        expiringReward.getCard().getCardId(),
                        expiringReward.getTitle(),
                        expiringReward.getExpirationDate(),
                        expiringReward.getDetails(),
                        expiringReward.getCard().getCardName(),
                        expiringReward.getCard().getDateOpened(),
                        expiringReward.getCard().getFee(),
                        expiringReward.getCard().getApr(),
                        expiringReward.getCard().getBalance(),
                        expiringReward.getCard().getCreditLimit(),
                        expiringReward.getCard().getDueDay(),
                        expiringReward.getCard().getUser().getEmail(),
                        expiringReward.getCard().getUser().getFirstName(),
                        expiringReward.getCard().getUser().getLastName()
                ))
                .toList();
    }

    //Get all expiring rewards for a specific card by its cardId
    @GetMapping("/card/{cardId}")
    public List<ExpiringRewardResponseDTO> getExpiringRewardsByCard(@PathVariable int cardId) {

        // Fetch all expiring rewards linked to that cardId
        List<ExpiringReward> rewards = expiringRewardRepository.findByCardCardId(cardId);

        // Map each reward to a DTO
        return rewards.stream()
                .map(reward -> new ExpiringRewardResponseDTO(
                        reward.getCard().getCardId(),
                        reward.getTitle(),
                        reward.getExpirationDate(),
                        reward.getDetails(),
                        reward.getCard().getCardName(),
                        reward.getCard().getDateOpened(),
                        reward.getCard().getFee(),
                        reward.getCard().getApr(),
                        reward.getCard().getBalance(),
                        reward.getCard().getCreditLimit(),
                        reward.getCard().getDueDay(),
                        reward.getCard().getUser().getEmail(),
                        reward.getCard().getUser().getFirstName(),
                        reward.getCard().getUser().getLastName()
                ))
                .toList();
    }

    // Get all expiring rewards for a specific user by their userId
    @GetMapping("/user/{userId}")
    public List<ExpiringRewardResponseDTO> getExpiringRewardsByUser(@PathVariable int userId) {

        // Fetch all expiring rewards linked to that userId
        List<ExpiringReward> rewards = expiringRewardRepository.findByCardUserUserId(userId);

        // Map each reward to a DTO
        return rewards.stream()
                .map(reward -> new ExpiringRewardResponseDTO(
                        reward.getCard().getCardId(),
                        reward.getTitle(),
                        reward.getExpirationDate(),
                        reward.getDetails(),
                        reward.getCard().getCardName(),
                        reward.getCard().getDateOpened(),
                        reward.getCard().getFee(),
                        reward.getCard().getApr(),
                        reward.getCard().getBalance(),
                        reward.getCard().getCreditLimit(),
                        reward.getCard().getDueDay(),
                        reward.getCard().getUser().getEmail(),
                        reward.getCard().getUser().getFirstName(),
                        reward.getCard().getUser().getLastName()
                ))
                .toList();
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
