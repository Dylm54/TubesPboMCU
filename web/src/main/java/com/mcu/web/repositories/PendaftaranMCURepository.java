package com.mcu.web.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.mcu.web.models.PendaftaranMCU;
import org.springframework.stereotype.Repository;


public interface PendaftaranMCURepository extends MongoRepository<PendaftaranMCU, String>{
    List<PendaftaranMCU> findByTanggalDaftarBetween(Date startDate, Date endDate);
}