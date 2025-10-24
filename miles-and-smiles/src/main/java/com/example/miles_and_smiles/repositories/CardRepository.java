package com.example.miles_and_smiles.repositories;

import com.example.miles_and_smiles.models.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CardRepository extends JpaRepository<Card, Integer> {

    List<Card> findByUserUserId(int userId);

}
