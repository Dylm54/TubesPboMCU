package com.mcu.web.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.mcu.web.models.PetugasAdminLab;
import org.springframework.stereotype.Repository;


public interface PetugasAdminLabRepository extends MongoRepository<PetugasAdminLab, String>{
    
}