package com.mcu.web.models;

import java.util.*;
import lombok.*;

@NoArgsConstructor
public class Pasien extends User{
    private List<PendaftaranMCU> riwayatPendaftaran = new ArrayList<PendaftaranMCU>();
    
    public Pasien(String id, String nama, String alamat, String noTelp) {
        super(id, nama, alamat, noTelp);
        
    }

    public List<PendaftaranMCU> getRiwayatPendaftaran() {
        return riwayatPendaftaran;
    }
}