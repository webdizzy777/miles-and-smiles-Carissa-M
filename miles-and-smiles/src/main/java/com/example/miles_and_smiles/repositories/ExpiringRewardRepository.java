package com.example.miles_and_smiles.repositories;

import com.example.miles_and_smiles.models.ExpiringReward;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpiringRewardRepository extends JpaRepository<ExpiringReward, Integer> {

    // Custom JPA method to find all ExpiringRewards where the linked Card has this cardId
    List<ExpiringReward> findByCardCardId(int cardId);

    // Custom JPA method to find all cards in the Card table where the userId matches the path variable
    List<ExpiringReward> findByCardUserUserId(int userId);

}