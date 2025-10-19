package com.example.miles_and_smiles.controllers;

import com.example.miles_and_smiles.dtos.NotableBenefitResponseDTO;
import com.example.miles_and_smiles.repositories.CardRepository;
import com.example.miles_and_smiles.repositories.NotableBenefitRepository;
import org.springframework.web.bind.annotation.GetMapping;
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


}
