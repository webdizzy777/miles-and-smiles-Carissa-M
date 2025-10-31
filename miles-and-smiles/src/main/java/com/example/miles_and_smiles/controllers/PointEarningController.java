package com.example.miles_and_smiles.controllers;

import com.example.miles_and_smiles.dtos.PointEarningDTO;
import com.example.miles_and_smiles.models.Card;
import com.example.miles_and_smiles.models.Category;
import com.example.miles_and_smiles.models.PointEarning;
import com.example.miles_and_smiles.repositories.CardRepository;
import com.example.miles_and_smiles.repositories.CategoryRepository;
import com.example.miles_and_smiles.repositories.PointEarningRepository;
import com.example.miles_and_smiles.repositories.UserRepository;
import com.example.miles_and_smiles.responseDtos.PointEarningResponseDTO;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/point-earnings")
public class PointEarningController {

    private final PointEarningRepository pointEarningRepository;
    private final CardRepository cardRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public PointEarningController(PointEarningRepository pointEarningRepository,
                                  CardRepository cardRepository,
                                  CategoryRepository categoryRepository,
                                  UserRepository userRepository) {
        this.pointEarningRepository = pointEarningRepository;
        this.cardRepository = cardRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<PointEarningResponseDTO> getAllPointEarnings() {
        return pointEarningRepository.findAll().stream()
                .map(pe -> new PointEarningResponseDTO(
                        pe.getEarningId(),
                        pe.getCard().getCardId(),
                        pe.getCard().getCardName(),
                        pe.getCategory().getCategoryId(),
                        pe.getCategory().getCategoryName(),
                        pe.getMultiplier()
                ))
                .toList();
    }

    @GetMapping("/{earningId}")
    public PointEarningResponseDTO getPointEarningById(@PathVariable int earningId) {
        PointEarning earning = pointEarningRepository.findById(earningId)
                .orElseThrow(() -> new RuntimeException("Point Earning not found with ID: " + earningId));

        return new PointEarningResponseDTO(
                earning.getEarningId(),
                earning.getCard().getCardId(),
                earning.getCard().getCardName(),
                earning.getCategory().getCategoryId(),
                earning.getCategory().getCategoryName(),
                earning.getMultiplier()
        );
    }

    @GetMapping("/user/{userId}")
    public List<PointEarningResponseDTO> getPointEarningsByUser(@PathVariable int userId) {

        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found with ID: " + userId);
        }

        return pointEarningRepository.findByCardUserUserId(userId).stream()
                .map(pe -> new PointEarningResponseDTO(
                        pe.getEarningId(),
                        pe.getCard().getCardId(),
                        pe.getCard().getCardName(),
                        pe.getCategory().getCategoryId(),
                        pe.getCategory().getCategoryName(),
                        pe.getMultiplier()
                ))
                .toList();
    }

    @GetMapping("/card/{cardId}")
    public List<PointEarningResponseDTO> getPointEarningsByCard(@PathVariable int cardId) {

        if (!cardRepository.existsById(cardId)) {
            throw new RuntimeException("Card not found with ID: " + cardId);
        }

        return pointEarningRepository.findByCardCardId(cardId).stream()
                .map(pe -> new PointEarningResponseDTO(
                        pe.getEarningId(),
                        pe.getCard().getCardId(),
                        pe.getCard().getCardName(),
                        pe.getCategory().getCategoryId(),
                        pe.getCategory().getCategoryName(),
                        pe.getMultiplier()
                ))
                .toList();
    }

    @PostMapping
    public PointEarningResponseDTO addPointEarning(@RequestBody PointEarningDTO dto) {
        Card card = cardRepository.findById(dto.getCardId())
                .orElseThrow(() -> new RuntimeException("Card not found with ID: " + dto.getCardId()));

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + dto.getCategoryId()));

        PointEarning newEarning = new PointEarning(card, category, dto.getMultiplier());
        PointEarning savedEarning = pointEarningRepository.save(newEarning);

        return new PointEarningResponseDTO(
                savedEarning.getEarningId(),
                card.getCardId(),
                card.getCardName(),
                category.getCategoryId(),
                category.getCategoryName(),
                savedEarning.getMultiplier()
        );
    }

    @PutMapping("/{earningId}")
    public PointEarningResponseDTO updatePointEarning(@PathVariable int earningId,
                                                      @RequestBody PointEarningDTO dto) {
        PointEarning existing = pointEarningRepository.findById(earningId)
                .orElseThrow(() -> new RuntimeException("Point Earning not found with ID: " + earningId));

        existing.setMultiplier(dto.getMultiplier());
        PointEarning updatedEarning = pointEarningRepository.save(existing);

        return new PointEarningResponseDTO(
                updatedEarning.getEarningId(),
                updatedEarning.getCard().getCardId(),
                updatedEarning.getCard().getCardName(),
                updatedEarning.getCategory().getCategoryId(),
                updatedEarning.getCategory().getCategoryName(),
                updatedEarning.getMultiplier()
        );
    }

    @DeleteMapping("/{earningId}")
    public void deletePointEarning(@PathVariable int earningId) {

        if (!pointEarningRepository.existsById(earningId)) {
            throw new RuntimeException("Point Earning not found with ID: " + earningId);
        }

        pointEarningRepository.deleteById(earningId);
    }
}
