package com.mcu.web.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.mcu.web.models.PaketMCU;

public interface PaketMCURepository extends MongoRepository<PaketMCU, String> {
    List<PaketMCU> findByJenisPemeriksaan(String jenisPemeriksaan);
}