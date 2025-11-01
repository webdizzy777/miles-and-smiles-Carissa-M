package com.example.miles_and_smiles.controllers;

import com.example.miles_and_smiles.dtos.NotableBenefitDTO;
import com.example.miles_and_smiles.models.User;
import com.example.miles_and_smiles.responseDtos.NotableBenefitResponseDTO;
import com.example.miles_and_smiles.models.Card;
import com.example.miles_and_smiles.models.NotableBenefit;
import com.example.miles_and_smiles.repositories.CardRepository;
import com.example.miles_and_smiles.repositories.NotableBenefitRepository;
import com.example.miles_and_smiles.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notable-benefits")
public class NotableBenefitController {

    private final NotableBenefitRepository notableBenefitRepository;
    private final CardRepository cardRepository;
    private final  UserRepository userRepository;

    public NotableBenefitController(NotableBenefitRepository notableBenefitRepository, CardRepository cardRepository, UserRepository userRepository) {
        this.notableBenefitRepository = notableBenefitRepository;
        this.cardRepository = cardRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<NotableBenefitResponseDTO> getAllNotableBenefits() {
        return notableBenefitRepository.findAll().stream()
                .map(benefit -> new NotableBenefitResponseDTO(
                        benefit.getBenefitId(),
                        benefit.getTitle(),
                        benefit.getDescription(),
                        benefit.getCard().getCardId(),
                        benefit.getCard().getCardName()
                ))
                .toList();
    }

    //Get all notable benefits for a specific card by its cardId
    @GetMapping("/card/{cardId}")
    public List<NotableBenefitResponseDTO> getNotableBenefitsByCard(@PathVariable int cardId) {
        List<NotableBenefit> benefits = notableBenefitRepository.findByCardCardId(cardId);

        if(!cardRepository.existsById(cardId)) {
            throw new RuntimeException("Card not found with ID: " + cardId);
        }

        return benefits.stream()
                .map(benefit -> new NotableBenefitResponseDTO(
                        benefit.getBenefitId(),
                        benefit.getTitle(),
                        benefit.getDescription(),
                        benefit.getCard().getCardId(),
                        benefit.getCard().getCardName()
                ))
                .toList();
    }

    //Get a single notable benefit by its ID
    @GetMapping("/{benefitId}")
    public NotableBenefitResponseDTO getNotableBenefitById(@PathVariable int benefitId) {
        NotableBenefit benefit = notableBenefitRepository.findById(benefitId)
                .orElseThrow(() -> new RuntimeException("Notable Benefit not found with ID: " + benefitId));

        return new NotableBenefitResponseDTO(
                benefit.getBenefitId(),
                benefit.getTitle(),
                benefit.getDescription(),
                benefit.getCard().getCardId(),
                benefit.getCard().getCardName()
        );
    }

    //Get all notable benefits for a specific user by their userId
    @GetMapping("/user/{userId}")
    public List<NotableBenefitResponseDTO> getNotableBenefitsByUser(@PathVariable int userId) {

        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found with ID: " + userId);
        }

        List<NotableBenefit> benefits = notableBenefitRepository.findByCardUserUserId(userId);
        return benefits.stream()
                .map(benefit -> new NotableBenefitResponseDTO(
                        benefit.getBenefitId(),
                        benefit.getTitle(),
                        benefit.getDescription(),
                        benefit.getCard().getCardId(),
                        benefit.getCard().getCardName()
                ))
                .toList();
    }

    @PostMapping
    public NotableBenefitResponseDTO addNotableBenefit(@RequestBody NotableBenefitDTO dto) {
        Card card = cardRepository.findById(dto.getCardId())
                .orElseThrow(() -> new RuntimeException("Card not found with ID: " + dto.getCardId()));

        NotableBenefit benefit = new NotableBenefit();
        benefit.setCard(card);
        benefit.setTitle(dto.getTitle());
        benefit.setDescription(dto.getDescription());

        NotableBenefit savedBenefit = notableBenefitRepository.save(benefit);

        return new NotableBenefitResponseDTO(
                savedBenefit.getBenefitId(),
                savedBenefit.getTitle(),
                savedBenefit.getDescription(),
                card.getCardId(),
                card.getCardName()
        );
    }

    @PutMapping("/{benefitId}")
    public NotableBenefitResponseDTO updateNotableBenefit(@PathVariable int benefitId,
                                                          @RequestBody NotableBenefitDTO dto) {
        NotableBenefit existingBenefit = notableBenefitRepository.findById(benefitId)
                .orElseThrow(() -> new RuntimeException("Notable Benefit not found with ID: " + benefitId));

        existingBenefit.setTitle(dto.getTitle());
        existingBenefit.setDescription(dto.getDescription());

        NotableBenefit updatedBenefit = notableBenefitRepository.save(existingBenefit);

        return new NotableBenefitResponseDTO(
                updatedBenefit.getBenefitId(),
                updatedBenefit.getTitle(),
                updatedBenefit.getDescription(),
                updatedBenefit.getCard().getCardId(),
                updatedBenefit.getCard().getCardName()
        );
    }

    @DeleteMapping("/{benefitId}")
    public void deleteNotableBenefit(@PathVariable int benefitId) {

        if(!notableBenefitRepository.existsById(benefitId)) {
            throw new RuntimeException("Notable Benefit not found with ID: " + benefitId);
        }

        notableBenefitRepository.deleteById(benefitId);
    }

}
