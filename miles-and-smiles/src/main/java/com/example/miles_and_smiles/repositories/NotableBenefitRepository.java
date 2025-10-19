package com.example.miles_and_smiles.repositories;

import com.example.miles_and_smiles.models.NotableBenefit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotableBenefitRepository extends JpaRepository<NotableBenefit, Integer> {
    List<NotableBenefit> findByCardCardId(int cardId);

    List<NotableBenefit> findByCardUserUserId(int userId);
}
