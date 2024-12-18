package com.mcu.web.services;

import org.springframework.stereotype.Service;

import com.mcu.web.repositories.PaketMCURepository;
import com.mcu.web.repositories.PasienRepository;
import com.mcu.web.repositories.PendaftaranMCURepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.mcu.web.models.PaketMCU;
import com.mcu.web.models.Pasien;
import com.mcu.web.models.PendaftaranMCU;

@Service
public class PasienService {
    @Autowired
    private PasienRepository pasienRepository;

    @Autowired
    private PaketMCURepository paketMCURepository;

    @Autowired
    private PendaftaranMCURepository pendaftaranMCURepository;

    public Pasien createPasien(Pasien pasien) {
        Optional<Pasien> existingPasien = pasienRepository.findByNoTelp(pasien.getNoTelp());

        if (existingPasien.isPresent()) {
            Pasien oldPasien = existingPasien.get();
            return oldPasien;
        }

        return pasienRepository.save(pasien);
    }

    public Pasien daftarMCU(String pasienId, PendaftaranMCU pendaftaran) {
        Optional<Pasien> optionalPasien = pasienRepository.findById(pasienId);
        if (!optionalPasien.isPresent()) {
            throw new RuntimeException("Pasien dengan ID " + pasienId + " tidak ditemukan.");
        }

        String paketId = pendaftaran.getPaket().getIdPaket();
        Optional<PaketMCU> optionalPaket = paketMCURepository.findById(paketId);
        if (!optionalPaket.isPresent()) {
            throw new RuntimeException("Paket MCU dengan ID " + paketId + " tidak ditemukan.");
        }

        Pasien pasien = optionalPasien.get();
        PaketMCU paket = optionalPaket.get();

        pendaftaran.setPaket(paket);
        pendaftaran.setPasien(pasien);

        pendaftaranMCURepository.save(pendaftaran);

        pasien.getRiwayatPendaftaran().add(pendaftaran);

        return pasienRepository.save(pasien);
    }

    public Optional<Pasien> findPasienById(String id) {
        return pasienRepository.findById(id);
    }

}