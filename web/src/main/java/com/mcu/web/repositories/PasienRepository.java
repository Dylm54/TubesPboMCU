package com.mcu.web.repositories;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.mcu.web.models.Pasien;

public interface PasienRepository extends MongoRepository<Pasien, String> {
    List<Pasien> findByNamaContainingIgnoreCase(String nama);

    List<Pasien> findByRiwayatPendaftaranPaketNamaPaket(String namaPaket);

    Optional<Pasien> findByNoTelp(String noTelp);

    List<Pasien> findByRiwayatPendaftaranPaketIdPaketAndRiwayatPendaftaranTanggalDaftarBetween(String paketId, Date startDate, Date endDate);
}