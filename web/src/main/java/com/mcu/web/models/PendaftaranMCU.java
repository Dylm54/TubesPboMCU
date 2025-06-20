package com.mcu.web.models;

import lombok.*;
import java.util.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@Setter
@NoArgsConstructor
public class PendaftaranMCU {
    @Id
    private String idPendaftaran;
    private Date tanggalDaftar;
    @DBRef
    @JsonIgnore
    private Pasien pasien;
    private PaketMCU paket;

    public PendaftaranMCU(String id, Date tanggal, String status, Pasien pasien, PaketMCU paket) {
        this.idPendaftaran = id;
        this.tanggalDaftar = tanggal;
        this.pasien = pasien;
        this.paket = paket;
    }

    public String getIdPendaftaran() {
        return this.idPendaftaran;
    }

    public void setIdPendaftaran(String idPendaftaran) {
        this.idPendaftaran = idPendaftaran;
    }

    public Date getTanggalDaftar() {
        return this.tanggalDaftar;
    }

    public void setTanggalDaftar(Date tanggalDaftar) {
        this.tanggalDaftar = tanggalDaftar;
    }

    public Pasien getPasien() {
        return this.pasien;
    }

    public void setPasien(Pasien pasien) {
        this.pasien = pasien;
    }

    public PaketMCU getPaket() {
        return this.paket;
    }

    public void setPaket(PaketMCU paket) {
        this.paket = paket;
    }

}