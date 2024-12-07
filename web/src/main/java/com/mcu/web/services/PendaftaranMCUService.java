package com.mcu.web.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mcu.web.models.PaketMCU;
import com.mcu.web.models.PendaftaranMCU;
import com.mcu.web.models.SumberPemasukan;
import com.mcu.web.repositories.PendaftaranMCURepository;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PendaftaranMCUService {
    @Autowired
    private PendaftaranMCURepository repository;

    public List<SumberPemasukan> getDetailPemasukan(Date startDate, Date endDate) {
        // Ambil semua pendaftaran dalam periode
        List<PendaftaranMCU> pendaftaranList = repository.findByTanggalDaftarBetween(startDate, endDate);

        // Buat list sumber pemasukan
        return pendaftaranList.stream()
                .map(pendaftaran -> new SumberPemasukan(
                        pendaftaran.getPaket().getNamaPaket(),
                        pendaftaran.getTanggalDaftar(),
                        pendaftaran.getPaket().getHarga()
                ))
                .collect(Collectors.toList());
    }

    public List<PendaftaranMCU> getAllRiwayatPendaftaran() {
        return repository.findAll();
    }

}
