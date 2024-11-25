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
    private String status;
    @DBRef
    @JsonIgnore
    private Pasien pasien;
    private PaketMCU paket;

    public PendaftaranMCU(String id, Date tanggal, String status, Pasien pasien, PaketMCU paket) {
        this.idPendaftaran = id;
        this.tanggalDaftar = tanggal;
        this.status = status;
        this.pasien = pasien;
        this.paket = paket;
    }

}