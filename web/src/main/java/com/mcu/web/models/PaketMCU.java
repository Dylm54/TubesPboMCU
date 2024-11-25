package com.mcu.web.models;

import lombok.*;
import org.springframework.data.annotation.Id;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaketMCU {
    @Id
    private String idPaket;
    private String namaPaket;
    private String jenisPemeriksaan;
    private double harga;
    
}