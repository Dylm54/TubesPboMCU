package com.mcu.web.models;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class PetugasAdminLab extends User{
    private String jabatan;

    public PetugasAdminLab(String id, String nama, String alamat, String noTelp, String jabatan, String password){
        super(id, nama, alamat, noTelp, password);
        this.jabatan = jabatan;
    }
}