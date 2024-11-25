package com.mcu.web.models;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SumberPemasukan {
    private String namaPaket;
    private Date tanggal;
    private double harga;
}