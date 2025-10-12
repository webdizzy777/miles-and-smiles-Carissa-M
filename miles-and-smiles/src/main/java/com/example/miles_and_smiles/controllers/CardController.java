package com.example.miles_and_smiles.controllers;

import com.example.miles_and_smiles.dtos.CardDTO;
import com.example.miles_and_smiles.models.User;
import com.example.miles_and_smiles.repositories.CardRepository;
import com.example.miles_and_smiles.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;
import com.example.miles_and_smiles.models.Card;
import java.util.List;
import java.util.Optional;


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
    public List<Card> getAllCards(){
        // get all cards from the database and return them as a list
        return cardRepository.findAll();
    }

    //Return a single Card object when id entered into /cards/id or else return null
    @GetMapping("/{id}")
    public Card getCard(@PathVariable int id){
        return cardRepository.findById(id).orElse(null);
    }

    // add a new card to the database when a card object is received from the front end as JSON
    @PostMapping
    public Card addCard(@RequestBody CardDTO cardDTO) {
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
        return cardRepository.save(card);
    }

    // update a card when the id is received at /cards/id
    // use Optional to only run if the card with that id is found
    // create a new updated card inside map using the JSON data from the front end, then save it
    @PutMapping("/{id}")
    public Optional<Card> updateCard(@PathVariable int id, @RequestBody Card card){
        return cardRepository.findById(id).map(updatedCard -> {
            updatedCard.setCardName(card.getCardName());
            updatedCard.setDateOpened(card.getDateOpened());
            updatedCard.setFee(card.getFee());
            updatedCard.setApr(card.getApr());
            updatedCard.setCreditLimit(card.getCreditLimit());
            updatedCard.setBalance(card.getBalance());
            updatedCard.setDueDay(card.getDueDay());
            return cardRepository.save(updatedCard);
        });
   }

   //delete the card by id received at /cards/id
   @DeleteMapping("/{id}")
   public void deleteCard(@PathVariable int id){
        cardRepository.deleteById(id);
    }

}
