package com.mcu.web.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.mcu.web.services.PasienService;
import com.mcu.web.models.Pasien;
import com.mcu.web.models.PendaftaranMCU;
import java.util.Optional;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
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

    @GetMapping("findPasienById/{id}")
    public ResponseEntity<?> getPasienById(@PathVariable String id) {
        Optional<Pasien> pasien = service.findPasienById(id);

        if (pasien.isPresent()) {
            return ResponseEntity.ok(pasien.get());
        } else {
            return ResponseEntity.status(404).body("Pasien dengan ID " + id + " tidak ditemukan.");
        }
    }
}