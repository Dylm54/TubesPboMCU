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
    private String deskripsiPaket;
    private String jenisPemeriksaan;
    private double harga;

    public String getIdPaket() {
        return this.idPaket;
    }

    public void setIdPaket(String idPaket) {
        this.idPaket = idPaket;
    }

    public String getNamaPaket() {
        return this.namaPaket;
    }

    public void setNamaPaket(String namaPaket) {
        this.namaPaket = namaPaket;
    }

    public String getDeskripsiPaket() {
        return this.deskripsiPaket;
    }

    public void setDeskripsiPaket(String deskripsiPaket) {
        this.deskripsiPaket = deskripsiPaket;
    }

    public String getJenisPemeriksaan() {
        return this.jenisPemeriksaan;
    }

    public void setJenisPemeriksaan(String jenisPemeriksaan) {
        this.jenisPemeriksaan = jenisPemeriksaan;
    }

    public double getHarga() {
        return this.harga;
    }

    public void setHarga(double harga) {
        this.harga = harga;
    }
    
}