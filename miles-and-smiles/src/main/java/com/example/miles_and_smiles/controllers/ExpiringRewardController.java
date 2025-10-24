package com.example.miles_and_smiles.controllers;

import com.example.miles_and_smiles.dtos.ExpiringRewardDTO;
import com.example.miles_and_smiles.models.Card;
import com.example.miles_and_smiles.models.ExpiringReward;
import com.example.miles_and_smiles.repositories.CardRepository;
import com.example.miles_and_smiles.repositories.ExpiringRewardRepository;
import com.example.miles_and_smiles.responseDtos.ExpiringRewardResponseDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expiring-rewards")
public class ExpiringRewardController {

    private final ExpiringRewardRepository expiringRewardRepository;
    private final CardRepository cardRepository;

    public ExpiringRewardController(ExpiringRewardRepository expiringRewardRepository,
                                    CardRepository cardRepository) {
        this.expiringRewardRepository = expiringRewardRepository;
        this.cardRepository = cardRepository;
    }

    @GetMapping
    public List<ExpiringRewardResponseDTO> getAllExpiringRewards() {
        return expiringRewardRepository.findAll().stream()
                .map(reward -> new ExpiringRewardResponseDTO(
                        reward.getRewardId(),
                        reward.getTitle(),
                        reward.getDetails(),
                        reward.getExpirationDate(),
                        reward.getCard().getCardId(),
                        reward.getCard().getCardName()
                ))
                .toList();
    }

    @GetMapping("/{rewardId}")
    public ExpiringRewardResponseDTO getExpiringRewardById(@PathVariable int rewardId) {
        ExpiringReward reward = expiringRewardRepository.findById(rewardId)
                .orElseThrow(() -> new RuntimeException("Expiring Reward not found with ID: " + rewardId));

        return new ExpiringRewardResponseDTO(
                reward.getRewardId(),
                reward.getTitle(),
                reward.getDetails(),
                reward.getExpirationDate(),
                reward.getCard().getCardId(),
                reward.getCard().getCardName()
        );
    }

    @GetMapping("/card/{cardId}")
    public List<ExpiringRewardResponseDTO> getExpiringRewardsByCard(@PathVariable int cardId) {
        List<ExpiringReward> rewards = expiringRewardRepository.findByCardCardId(cardId);

        if (!cardRepository.existsById(cardId)) {
            throw new RuntimeException("Card not found with ID: " + cardId);
        }

        return rewards.stream()
                .map(reward -> new ExpiringRewardResponseDTO(
                        reward.getRewardId(),
                        reward.getTitle(),
                        reward.getDetails(),
                        reward.getExpirationDate(),
                        reward.getCard().getCardId(),
                        reward.getCard().getCardName()
                ))
                .toList();
    }

    @GetMapping("/user/{userId}")
    public List<ExpiringRewardResponseDTO> getExpiringRewardsByUser(@PathVariable int userId) {
        List<ExpiringReward> rewards = expiringRewardRepository.findByCardUserUserId(userId);

        if (!cardRepository.existsById(userId)) {
            throw new RuntimeException("User not found with ID: " + userId);
        }

        return rewards.stream()
                .map(reward -> new ExpiringRewardResponseDTO(
                        reward.getRewardId(),
                        reward.getTitle(),
                        reward.getDetails(),
                        reward.getExpirationDate(),
                        reward.getCard().getCardId(),
                        reward.getCard().getCardName()
                ))
                .toList();
    }

    @PostMapping
    public ExpiringRewardResponseDTO addExpiringReward(@RequestBody ExpiringRewardDTO dto) {
        Card card = cardRepository.findById(dto.getCardId())
                .orElseThrow(() -> new RuntimeException("Card not found with ID: " + dto.getCardId()));

        ExpiringReward newReward = new ExpiringReward(
                dto.getTitle(),
                dto.getDetails(),
                dto.getExpirationDate(),
                card
        );

        ExpiringReward savedReward = expiringRewardRepository.save(newReward);

        return new ExpiringRewardResponseDTO(
                savedReward.getRewardId(),
                savedReward.getTitle(),
                savedReward.getDetails(),
                savedReward.getExpirationDate(),
                card.getCardId(),
                card.getCardName()
        );
    }

    @PutMapping("/{rewardId}")
    public ExpiringRewardResponseDTO updateExpiringReward(@PathVariable int rewardId,
                                                          @RequestBody ExpiringRewardDTO dto) {
        ExpiringReward existingReward = expiringRewardRepository.findById(rewardId)
                .orElseThrow(() -> new RuntimeException("Expiring Reward not found with ID: " + rewardId));

        existingReward.setTitle(dto.getTitle());
        existingReward.setDetails(dto.getDetails());
        existingReward.setExpirationDate(dto.getExpirationDate());

        ExpiringReward updatedReward = expiringRewardRepository.save(existingReward);

        return new ExpiringRewardResponseDTO(
                updatedReward.getRewardId(),
                updatedReward.getTitle(),
                updatedReward.getDetails(),
                updatedReward.getExpirationDate(),
                updatedReward.getCard().getCardId(),
                updatedReward.getCard().getCardName()
        );
    }

    @DeleteMapping("/{rewardId}")
    public void deleteExpiringReward(@PathVariable int rewardId) {

        if (!expiringRewardRepository.existsById(rewardId)) {
            throw new RuntimeException("Expiring Reward not found with ID: " + rewardId);
        }
        expiringRewardRepository.deleteById(rewardId);
    }
}
