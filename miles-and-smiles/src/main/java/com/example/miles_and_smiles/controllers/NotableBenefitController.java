package com.example.miles_and_smiles.controllers;

import com.example.miles_and_smiles.dtos.NotableBenefitResponseDTO;
import com.example.miles_and_smiles.repositories.CardRepository;
import com.example.miles_and_smiles.repositories.NotableBenefitRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/NotableBenefits")
public class NotableBenefitController {

    private final NotableBenefitRepository notableBenefitRepository;
    private final CardRepository cardRepository;

    public NotableBenefitController(NotableBenefitRepository notableBenefitRepository, CardRepository cardRepository) {
        this.notableBenefitRepository = notableBenefitRepository;
        this.cardRepository = cardRepository;
    }

    @GetMapping
    public List<NotableBenefitResponseDTO> getAllNotableBenefits() {
        return notableBenefitRepository.findAll().stream()
                .map(benefit -> new NotableBenefitResponseDTO(
                        benefit.getBenefitId(),
                        benefit.getTitle(),
                        benefit.getDescription(),
                        benefit.getCard().getCardId(),
                        benefit.getCard().getCardName(),
                        benefit.getCard().getDateOpened(),
                        benefit.getCard().getFee(),
                        benefit.getCard().getApr(),
                        benefit.getCard().getCreditLimit(),
                        benefit.getCard().getBalance(),
                        benefit.getCard().getDueDay(),
                        benefit.getCard().getUser().getEmail(),
                        benefit.getCard().getUser().getFirstName(),
                        benefit.getCard().getUser().getLastName()
                ))
                .toList();
    }

    //Get all notable benefits for a specific card by its cardId
    @GetMapping("/card/{cardId}")
    public List<NotableBenefitResponseDTO> getNotableBenefitsByCard(@PathVariable int cardId) {
        // Fetch all notable benefits linked to that cardId
        List<com.example.miles_and_smiles.models.NotableBenefit> benefits = notableBenefitRepository.findByCardCardId(cardId);

        // Map each benefit to a DTO
        return benefits.stream()
                .map(benefit -> new NotableBenefitResponseDTO(
                        benefit.getBenefitId(),
                        benefit.getTitle(),
                        benefit.getDescription(),
                        benefit.getCard().getCardId(),
                        benefit.getCard().getCardName(),
                        benefit.getCard().getDateOpened(),
                        benefit.getCard().getFee(),
                        benefit.getCard().getApr(),
                        benefit.getCard().getCreditLimit(),
                        benefit.getCard().getBalance(),
                        benefit.getCard().getDueDay(),
                        benefit.getCard().getUser().getEmail(),
                        benefit.getCard().getUser().getFirstName(),
                        benefit.getCard().getUser().getLastName()
                ))
                .toList();
    }

    //Get a single notable benefit by its ID
    @GetMapping("/{benefitId}")
    public NotableBenefitResponseDTO getNotableBenefitById(@PathVariable int benefitId) {
        com.example.miles_and_smiles.models.NotableBenefit benefit = notableBenefitRepository.findById(benefitId)
                .orElseThrow(() -> new RuntimeException("Notable Benefit not found with ID: " + benefitId));

        return new NotableBenefitResponseDTO(
                benefit.getBenefitId(),
                benefit.getTitle(),
                benefit.getDescription(),
                benefit.getCard().getCardId(),
                benefit.getCard().getCardName(),
                benefit.getCard().getDateOpened(),
                benefit.getCard().getFee(),
                benefit.getCard().getApr(),
                benefit.getCard().getCreditLimit(),
                benefit.getCard().getBalance(),
                benefit.getCard().getDueDay(),
                benefit.getCard().getUser().getEmail(),
                benefit.getCard().getUser().getFirstName(),
                benefit.getCard().getUser().getLastName()
        );
    }

    //Get all notable benefits for a specific user by their userId
    @GetMapping("/user/{userId}")
    public List<NotableBenefitResponseDTO> getNotableBenefitsByUser(@PathVariable int userId) {
        // Fetch all notable benefits linked to that userId
        List<com.example.miles_and_smiles.models.NotableBenefit> benefits = notableBenefitRepository.findByCardUserUserId(userId);
        // Map each benefit to a DTO
        return benefits.stream()
                .map(benefit -> new NotableBenefitResponseDTO(
                        benefit.getBenefitId(),
                        benefit.getTitle(),
                        benefit.getDescription(),
                        benefit.getCard().getCardId(),
                        benefit.getCard().getCardName(),
                        benefit.getCard().getDateOpened(),
                        benefit.getCard().getFee(),
                        benefit.getCard().getApr(),
                        benefit.getCard().getCreditLimit(),
                        benefit.getCard().getBalance(),
                        benefit.getCard().getDueDay(),
                        benefit.getCard().getUser().getEmail(),
                        benefit.getCard().getUser().getFirstName(),
                        benefit.getCard().getUser().getLastName()
                ))
                .toList();
    }

}
