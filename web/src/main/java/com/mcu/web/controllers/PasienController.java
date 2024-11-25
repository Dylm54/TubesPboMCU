package com.mcu.web.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import com.mcu.web.services.PasienService;
import com.mcu.web.models.Pasien;
import com.mcu.web.models.PendaftaranMCU;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pasien")
public class PasienController {
    @Autowired
    private PasienService service;

    @PostMapping("/addPasien")
    public Pasien addPasien(@RequestBody Pasien pasien) {
        return service.createPasien(pasien);
    }

    @PostMapping("/daftar-mcu/{id}")
    public Pasien daftarMCU(@PathVariable String id, @RequestBody PendaftaranMCU pendaftaran) {
        return service.daftarMCU(id, pendaftaran);
    }
}