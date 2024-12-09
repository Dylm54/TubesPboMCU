package com.mcu.web.models;

import java.util.*;
import lombok.*;

@NoArgsConstructor
public class Pasien extends User{
    private List<PendaftaranMCU> riwayatPendaftaran = new ArrayList<PendaftaranMCU>();
    
    public Pasien(String id, String nama, String alamat, String noTelp, String password) {
        super(id, nama, alamat, noTelp, password);
        
    }

    public List<PendaftaranMCU> getRiwayatPendaftaran() {
        return riwayatPendaftaran;
    }
}   