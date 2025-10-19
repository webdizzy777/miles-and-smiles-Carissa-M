package com.example.miles_and_smiles.controllers;

import com.example.miles_and_smiles.dtos.*;
import com.example.miles_and_smiles.models.*;
import com.example.miles_and_smiles.repositories.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/PointEarnings")
public class PointEarningController {

    private final PointEarningRepository pointEarningRepository;
    private final CardRepository cardRepository;
    private final CategoryRepository categoryRepository;

    public PointEarningController(PointEarningRepository pointEarningRepository,
                                  CardRepository cardRepository,
                                  CategoryRepository categoryRepository) {
        this.pointEarningRepository = pointEarningRepository;
        this.cardRepository = cardRepository;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public List<PointEarningResponseDTO> getAllPointEarnings() {
        return pointEarningRepository.findAll().stream()
                .map(pe -> new PointEarningResponseDTO(
                        pe.getCard().getCardId(),
                        new CategoryDTO(
                                pe.getCategory().getCategoryId(),
                                pe.getCategory().getCategoryName()
                        ),
                        pe.getMultiplier()
                ))
                .toList();
    }

    @GetMapping("/card/{cardId}")
    public List<PointEarningResponseDTO> getPointEarningsByCard(@PathVariable int cardId) {
        return pointEarningRepository.findByCardCardId(cardId).stream()
                .map(pe -> new PointEarningResponseDTO(
                        pe.getCard().getCardId(),
                        new CategoryDTO(
                                pe.getCategory().getCategoryId(),
                                pe.getCategory().getCategoryName()
                        ),
                        pe.getMultiplier()
                ))
                .toList();
    }

    @PostMapping
    public PointEarning addPointEarning(@RequestBody PointEarningDTO dto) {
        Card card = cardRepository.findById(dto.getCardId())
                .orElseThrow(() -> new RuntimeException("Card not found with ID: " + dto.getCardId()));
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + dto.getCategoryId()));
        PointEarning newEarning = new PointEarning(card, category, dto.getMultiplier());
        return pointEarningRepository.save(newEarning);
    }

    @PutMapping("/{earningId}")
    public PointEarning updatePointEarning(@PathVariable int earningId, @RequestBody PointEarningDTO dto) {
        PointEarning existing = pointEarningRepository.findById(earningId)
                .orElseThrow(() -> new RuntimeException("Earning not found with ID: " + earningId));
        existing.setMultiplier(dto.getMultiplier());
        return pointEarningRepository.save(existing);
    }

    @DeleteMapping("/{earningId}")
    public void deletePointEarning(@PathVariable int earningId) {
        pointEarningRepository.deleteById(earningId);
    }
}
