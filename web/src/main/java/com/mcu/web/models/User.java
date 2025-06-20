package com.mcu.web.models;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    private String id;

    @JsonProperty("nama")
    private String nama;

    @JsonProperty("alamat")
    private String alamat;

    @JsonProperty("noTelp")
    private String noTelp;

    @JsonProperty("password")
    private String password;

    @JsonCreator
    public User(@JsonProperty("id") String id,
                @JsonProperty("nama") String nama,
                @JsonProperty("alamat") String alamat,
                @JsonProperty("password") String password,
                @JsonProperty("noTelp") String noTelp) {
        this.id = id;
        this.nama = nama;
        this.alamat = alamat;
        this.noTelp = noTelp;
        this.password = password;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNama() {
        return this.nama;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getAlamat() {
        return this.alamat;
    }

    public void setAlamat(String alamat) {
        this.alamat = alamat;
    }

    public String getNoTelp() {
        return this.noTelp;
    }

    public void setNoTelp(String noTelp) {
        this.noTelp = noTelp;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}   
