package com.example.miles_and_smiles.controllers;

import com.example.miles_and_smiles.dtos.CardDTO;
import com.example.miles_and_smiles.models.Card;
import com.example.miles_and_smiles.models.User;
import com.example.miles_and_smiles.repositories.CardRepository;
import com.example.miles_and_smiles.repositories.UserRepository;
import com.example.miles_and_smiles.responseDtos.CardResponseDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cards")
public class CardController {

    private final CardRepository cardRepository;
    private final UserRepository userRepository;

    public CardController(CardRepository cardRepository, UserRepository userRepository) {
        this.cardRepository = cardRepository;
        this.userRepository = userRepository;
    }

    //Use a stream to loop through every card and extract only the fields
    //wanted to return to the frontend as a list of Response DTOs
    @GetMapping
    public List<CardResponseDTO> getAllCards() {
        return cardRepository.findAll().stream()
                .map(card -> new CardResponseDTO(
                        card.getCardId(),
                        card.getCardName(),
                        card.getDateOpened(),
                        card.getFee(),
                        card.getApr(),
                        card.getCreditLimit(),
                        card.getBalance(),
                        card.getDueDay(),
                        card.getUser().getUserId()
                ))
                .toList();
    }

    //If the card doesn’t exist throw an error message.
    // Otherwise create a DTO with the card’s info.
    @GetMapping("/{id}")
    public CardResponseDTO getCard(@PathVariable int id) {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Card not found with ID: " + id));

        return new CardResponseDTO(
                card.getCardId(),
                card.getCardName(),
                card.getDateOpened(),
                card.getFee(),
                card.getApr(),
                card.getCreditLimit(),
                card.getBalance(),
                card.getDueDay(),
                card.getUser().getUserId()
        );
    }

    @GetMapping("/user/{userId}")
    public List<CardResponseDTO> getCardsByUser(@PathVariable int userId) {
        List<Card> cards = cardRepository.findByUserUserId(userId);

        if(cards.isEmpty()) {
            throw new RuntimeException("No cards found for User ID: " + userId);
        }

        return cards.stream()
                .map(card -> new CardResponseDTO(
                        card.getCardId(),
                        card.getCardName(),
                        card.getDateOpened(),
                        card.getFee(),
                        card.getApr(),
                        card.getCreditLimit(),
                        card.getBalance(),
                        card.getDueDay(),
                        card.getUser().getUserId()
                ))
                .toList();
    }

    @PostMapping
    public CardResponseDTO addCard(@RequestBody CardDTO cardDTO) {
        // find the user who owns this card
        User user = userRepository.findById(cardDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + cardDTO.getUserId()));

        // create a new Card object and fill in its fields
        Card card = new Card();
        card.setUser(user);
        card.setCardName(cardDTO.getCardName());
        card.setDateOpened(cardDTO.getDateOpened());
        card.setFee(cardDTO.getFee());
        card.setApr(cardDTO.getApr());
        card.setCreditLimit(cardDTO.getCreditLimit());
        card.setBalance(cardDTO.getBalance());
        card.setDueDay(cardDTO.getDueDay());

        // save the new card
        Card savedCard = cardRepository.save(card);

        // return response
        return new CardResponseDTO(
                savedCard.getCardId(),
                savedCard.getCardName(),
                savedCard.getDateOpened(),
                savedCard.getFee(),
                savedCard.getApr(),
                savedCard.getCreditLimit(),
                savedCard.getBalance(),
                savedCard.getDueDay(),
                user.getUserId()
        );
    }


    @PutMapping("/{id}")
    public CardResponseDTO updateCard(@PathVariable int id, @RequestBody CardDTO cardDTO) {
        Card existingCard = cardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Card not found with ID: " + id));

        existingCard.setCardName(cardDTO.getCardName());
        existingCard.setDateOpened(cardDTO.getDateOpened());
        existingCard.setFee(cardDTO.getFee());
        existingCard.setApr(cardDTO.getApr());
        existingCard.setCreditLimit(cardDTO.getCreditLimit());
        existingCard.setBalance(cardDTO.getBalance());
        existingCard.setDueDay(cardDTO.getDueDay());

        Card savedCard = cardRepository.save(existingCard);

        return new CardResponseDTO(
                savedCard.getCardId(),
                savedCard.getCardName(),
                savedCard.getDateOpened(),
                savedCard.getFee(),
                savedCard.getApr(),
                savedCard.getCreditLimit(),
                savedCard.getBalance(),
                savedCard.getDueDay(),
                savedCard.getUser().getUserId()
        );
    }


    @DeleteMapping("/{id}")
    public void deleteCard(@PathVariable int id) {

        if(!cardRepository.existsById(id)) {
            throw new RuntimeException("Card not found with ID: " + id);
        }

        cardRepository.deleteById(id);
    }
}