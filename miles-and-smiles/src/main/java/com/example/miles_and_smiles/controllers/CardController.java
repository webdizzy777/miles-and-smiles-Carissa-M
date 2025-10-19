package com.example.miles_and_smiles.controllers;

import com.example.miles_and_smiles.dtos.CardDTO;
import com.example.miles_and_smiles.responseDtos.CardResponseDTO;
import com.example.miles_and_smiles.models.User;
import com.example.miles_and_smiles.repositories.CardRepository;
import com.example.miles_and_smiles.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;
import com.example.miles_and_smiles.models.Card;
import java.util.List;

// tell Spring this class handles web requests & then set the base URL
@RestController
@RequestMapping("/cards")
public class CardController {

    // inject the Card and User Repository so we can talk to the database
    private final CardRepository cardRepository;
    private final UserRepository userRepository;

    public CardController(CardRepository cardRepository, UserRepository userRepository) {
        this.cardRepository = cardRepository;
        this.userRepository = userRepository;
    }

    // handle GET requests to /cards
    @GetMapping
    public List<CardResponseDTO> getAllCards() {
        // get all cards from the database
        // turn them into a stream list we can process one by one
        return cardRepository.findAll().stream()
                // for each card, create a new CardResponseDTO
                .map(card -> new CardResponseDTO(
                        card.getCardId(),
                        card.getCardName(),
                        card.getDateOpened(),
                        card.getFee(),
                        card.getApr(),
                        card.getCreditLimit(),
                        card.getBalance(),
                        card.getDueDay(),
                        card.getUser().getFirstName(),
                        card.getUser().getLastName(),
                        card.getUser().getEmail()
                ))
                // collect everything back into a list to return as JSON
                .toList();
    }

    //Return a single Card object when id entered into /cards/id or else return null
    @GetMapping("/{id}")
    public CardResponseDTO getCard(@PathVariable int id) {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Card not found with ID: " + id));

        User user = card.getUser();

        return new CardResponseDTO(
                card.getCardId(),
                card.getCardName(),
                card.getDateOpened(),
                card.getFee(),
                card.getApr(),
                card.getCreditLimit(),
                card.getBalance(),
                card.getDueDay(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail()
        );
    }

    // add a new card to the database when a card object is received from the front end as JSON
    @PostMapping
    public CardResponseDTO addCard(@RequestBody CardDTO cardDTO) {
        // get the user from the database using the userId inside the cardDTO
        // if the user does not exist, stop and throw an error message
        User user = userRepository.findById(cardDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + cardDTO.getUserId()));

        // create a new card and set its fields
        Card card = new Card();
        // attach the real User object we just found so Hibernate knows the relationship
        card.setUser(user);
        // fill in all the card details coming from the front end (through the DTO)
        card.setCardName(cardDTO.getCardName());
        card.setDateOpened(cardDTO.getDateOpened());
        card.setFee(cardDTO.getFee());
        card.setApr(cardDTO.getApr());
        card.setCreditLimit(cardDTO.getCreditLimit());
        card.setBalance(cardDTO.getBalance());
        card.setDueDay(cardDTO.getDueDay());

        // save the card to the database
        Card savedCard = cardRepository.save(card);

        //return only fields we want from our DTO
        return new CardResponseDTO(
                savedCard.getCardId(),
                savedCard.getCardName(),
                savedCard.getDateOpened(),
                savedCard.getFee(),
                savedCard.getApr(),
                savedCard.getCreditLimit(),
                savedCard.getBalance(),
                savedCard.getDueDay(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail()
        );
    }

    @PutMapping("/{id}")
    public CardResponseDTO updateCard(@PathVariable int id, @RequestBody CardDTO cardDTO) {

        // Find the card by ID or throw an error if it doesn’t exist
        Card existingCard = cardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Card not found with ID: " + id));

        // Update only the fields you allow to change
        existingCard.setCardName(cardDTO.getCardName());
        existingCard.setDateOpened(cardDTO.getDateOpened());
        existingCard.setFee(cardDTO.getFee());
        existingCard.setApr(cardDTO.getApr());
        existingCard.setCreditLimit(cardDTO.getCreditLimit());
        existingCard.setBalance(cardDTO.getBalance());
        existingCard.setDueDay(cardDTO.getDueDay());

        // Save the updated card
        Card savedCard = cardRepository.save(existingCard);

        // Return a clean CardResponseDTO to the frontend
        User user = savedCard.getUser();
        return new CardResponseDTO(
                savedCard.getCardId(),
                savedCard.getCardName(),
                savedCard.getDateOpened(),
                savedCard.getFee(),
                savedCard.getApr(),
                savedCard.getCreditLimit(),
                savedCard.getBalance(),
                savedCard.getDueDay(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail()
        );
    }

    //delete the card by id received at /cards/id
   @DeleteMapping("/{id}")
   public void deleteCard(@PathVariable int id){
        cardRepository.deleteById(id);
    }

}