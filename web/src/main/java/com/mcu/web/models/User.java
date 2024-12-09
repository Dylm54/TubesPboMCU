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
}   
