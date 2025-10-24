package com.example.miles_and_smiles.repositories;

import com.example.miles_and_smiles.models.PointEarning;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PointEarningRepository extends JpaRepository<PointEarning, Integer> {

    List<PointEarning> findByCardCardId(int cardId);
    List<PointEarning> findByCardUserUserId(int userId);

}
