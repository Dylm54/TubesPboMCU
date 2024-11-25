package com.mcu.web.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mcu.web.models.PaketMCU;
import com.mcu.web.models.Pasien;
import com.mcu.web.models.PetugasAdminLab;
import com.mcu.web.repositories.PaketMCURepository;
import com.mcu.web.repositories.PasienRepository;
import com.mcu.web.repositories.PetugasAdminLabRepository;

@Service
public class PetugasAdminLabService {
    @Autowired
    private PetugasAdminLabRepository PetugasAdminLabRepository;

    @Autowired
    private PaketMCURepository paketMCURepository;

    @Autowired
    private PasienRepository pasienRepository;

    public PetugasAdminLab createAdmin(PetugasAdminLab admin) {
        return PetugasAdminLabRepository.save(admin);
    }

    public PaketMCU createPaketMCU(PaketMCU paket) {
        return paketMCURepository.save(paket);
    }

    public PaketMCU ubahPaket(String id, PaketMCU paketBaru) {
        Optional <PaketMCU> optionalPaket = paketMCURepository.findById(id);

        if (optionalPaket.isPresent()) {
            PaketMCU paketLama = optionalPaket.get();

            paketLama.setNamaPaket(paketBaru.getNamaPaket());
            paketLama.setHarga(paketBaru.getHarga());
            paketLama.setJenisPemeriksaan(paketBaru.getJenisPemeriksaan());

            return paketMCURepository.save(paketLama);
        } else {
            throw new RuntimeException("PaketMCU dengan ID " + id + " tidak ditemukan.");
        }
    }

    public void hapusPaket(String id) {
        Optional<PaketMCU> optionalPaket = paketMCURepository.findById(id);
    
        if (optionalPaket.isPresent()) {
            paketMCURepository.deleteById(id);
            System.out.println("Paket dengan ID " + id + " berhasil dihapus.");
        } else {
            throw new RuntimeException("Paket dengan ID " + id + " tidak ditemukan.");
        }
    }

    public List<Pasien> cariPasienByNama(String nama) {
        return pasienRepository.findByNamaContainingIgnoreCase(nama);
    }

    public List<Pasien> cariPasienByNamaPaket(String namaPaket) {
        return pasienRepository.findByRiwayatPendaftaranPaketNamaPaket(namaPaket);
    }

    public List<Pasien> getPasienByPaketAndTanggalDaftar(String paketId, Date startDate, Date endDate) {
        return pasienRepository.findByRiwayatPendaftaranPaketIdPaketAndRiwayatPendaftaranTanggalDaftarBetween(paketId, startDate, endDate);
    }

    public List<Pasien> getAllPasien() {
        return pasienRepository.findAll();
    }

    public List<PaketMCU> getAllPaket() {
        return paketMCURepository.findAll();
    }

}