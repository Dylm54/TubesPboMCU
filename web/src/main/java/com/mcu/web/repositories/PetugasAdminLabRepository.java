package com.mcu.web.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.mcu.web.models.PetugasAdminLab;
import org.springframework.stereotype.Repository;
import java.util.Optional;


public interface PetugasAdminLabRepository extends MongoRepository<PetugasAdminLab, String>{
    Optional<PetugasAdminLab> findByNoTelp(String noTelp);
}