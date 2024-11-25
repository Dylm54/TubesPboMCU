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
        // Cek apakah pasien dengan noTelp sudah ada
        Optional<Pasien> existingPasien = pasienRepository.findByNoTelp(pasien.getNoTelp());

        if (existingPasien.isPresent()) {
            // Jika pasien sudah ada, throw exception
            throw new IllegalArgumentException(
                    "Pasien dengan nomor telepon " + pasien.getNoTelp() + " sudah terdaftar.");
        }

        // Simpan pasien jika belum ada
        return pasienRepository.save(pasien);
    }

    public Pasien daftarMCU(String pasienId, PendaftaranMCU pendaftaran) {
        // Cari pasien berdasarkan ID
        Optional<Pasien> optionalPasien = pasienRepository.findById(pasienId);
        if (!optionalPasien.isPresent()) {
            throw new RuntimeException("Pasien dengan ID " + pasienId + " tidak ditemukan.");
        }

        // Validasi paket MCU
        String paketId = pendaftaran.getPaket().getIdPaket();
        Optional<PaketMCU> optionalPaket = paketMCURepository.findById(paketId);
        if (!optionalPaket.isPresent()) {
            throw new RuntimeException("Paket MCU dengan ID " + paketId + " tidak ditemukan.");
        }

        // Dapatkan pasien dan paket
        Pasien pasien = optionalPasien.get();
        PaketMCU paket = optionalPaket.get();

        // Tetapkan paket ke pendaftaran
        pendaftaran.setPaket(paket);
        pendaftaran.setPasien(pasien);

        pendaftaranMCURepository.save(pendaftaran);

        // Tambahkan pendaftaran ke riwayat pasien
        pasien.getRiwayatPendaftaran().add(pendaftaran);

        // Simpan pasien dengan data terbaru
        return pasienRepository.save(pasien);
    }

}