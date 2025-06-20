package com.mcu.web.models;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class SumberPemasukan {
    private String namaPaket;
    private Date tanggal;
    private double harga;

    
        public SumberPemasukan() {
        }
    
        public SumberPemasukan(String namaPaket, Date tanggalDaftar, double harga) {
            this.namaPaket = namaPaket;
            this.tanggal = tanggalDaftar;
            this.harga = harga;
        }

    public String getNamaPaket() {
        return this.namaPaket;
    }

    public void setNamaPaket(String namaPaket) {
        this.namaPaket = namaPaket;
    }

    public Date getTanggal() {
        return this.tanggal;
    }

    public void setTanggal(Date tanggal) {
        this.tanggal = tanggal;
    }

    public double getHarga() {
        return this.harga;
    }

    public void setHarga(double harga) {
        this.harga = harga;
    }
    
}