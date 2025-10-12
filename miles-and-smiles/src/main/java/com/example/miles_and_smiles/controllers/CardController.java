package com.example.miles_and_smiles.controllers;

import com.example.miles_and_smiles.repositories.CardRepository;
import org.springframework.web.bind.annotation.*;
import com.example.miles_and_smiles.models.Card;
import java.util.List;
import java.util.Optional;


// tell Spring this class handles web requests & then set the base URL
@RestController
@RequestMapping("/cards")
public class CardController {

    private final CardRepository cardRepository;

    // inject the CardRepository so we can talk to the database
    public CardController(CardRepository cardRepository){
        this.cardRepository = cardRepository;
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
    public Card addCard(@RequestBody Card card){
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
