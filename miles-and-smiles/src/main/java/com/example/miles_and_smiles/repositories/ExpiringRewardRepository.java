package com.example.miles_and_smiles.repositories;

import com.example.miles_and_smiles.models.ExpiringReward;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpiringRewardRepository extends JpaRepository<ExpiringReward, Integer> {
}
