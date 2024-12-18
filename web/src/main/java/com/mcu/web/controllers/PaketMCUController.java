package com.mcu.web.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.mcu.web.repositories.PaketMCURepository;
import com.mcu.web.models.PaketMCU;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/paket")
public class PaketMCUController {

    @Autowired
    private PaketMCURepository paketMCURepository;

    @GetMapping("/getAllJenisPemeriksaan")
    public List<String> getUniqueJenisPemeriksaan() {
        List<PaketMCU> allPaket = paketMCURepository.findAll();

        Set<String> uniqueJenis = allPaket.stream()
                .map(PaketMCU::getJenisPemeriksaan)
                .collect(Collectors.toSet());    

        return new ArrayList<>(uniqueJenis);
    }
}
