package com.mcu.web.controllers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mcu.web.models.PetugasAdminLab;
import com.mcu.web.models.SumberPemasukan;
import com.mcu.web.models.PaketMCU;
import com.mcu.web.models.Pasien;
import com.mcu.web.services.PendaftaranMCUService;
import com.mcu.web.services.PetugasAdminLabService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/admin")
public class PetugasAdminLabController {
    @Autowired
    private PetugasAdminLabService adminService;

    @Autowired
    private PendaftaranMCUService pendaftaranService;

    @PostMapping("/add")
    public PetugasAdminLab addAdmin(@RequestBody PetugasAdminLab admin) {
        return adminService.createAdmin(admin);
    }

    @PostMapping("/addPaketFromAdmin")
    public PaketMCU createPaketFromAdmin(@RequestBody PaketMCU paket) {
        return adminService.createPaketMCU(paket);
    }

    @PutMapping("/ubahPaketFromAdmin/{id}")
    public PaketMCU updatePaketFromAdmin(@PathVariable String id, @RequestBody PaketMCU paket) {
        return adminService.ubahPaket(id, paket);
    }

    @DeleteMapping("/hapusPaketFromAdmin/{id}")
    public ResponseEntity<String> hapusPaket(@PathVariable String id) {
        try {
            adminService.hapusPaket(id);
            return ResponseEntity.ok("Paket dengan ID " + id + " berhasil dihapus.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/cariPasienByNama/{nama}")
    public ResponseEntity<List<Pasien>> cariPasien(@PathVariable String nama) {
        List<Pasien> hasil = adminService.cariPasienByNama(nama);
        if (!hasil.isEmpty()) {
            return ResponseEntity.ok(hasil);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/cariPasienByPaket") // + ex(?namaPaket=panas1)
    public List<Pasien> cariPasienByNamaPaket(@RequestParam String namaPaket) {
        return adminService.cariPasienByNamaPaket(namaPaket);
    }

    @GetMapping("/laporanPemasukan") // + ex(?startDate=2024-11-01&endDate=2024-11-15)
    public Map<String, Object> getLaporanPemasukan(@RequestParam String startDate, @RequestParam String endDate)
            throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date start = dateFormat.parse(startDate);
        Date end = dateFormat.parse(endDate);

        List<SumberPemasukan> detail = pendaftaranService.getDetailPemasukan(start, end);
        double total = detail.stream().mapToDouble(SumberPemasukan::getHarga).sum();

        // Membuat respons sebagai map
        Map<String, Object> laporan = new HashMap<>();
        laporan.put("detail", detail);
        laporan.put("total", total);

        return laporan;
    }

    @GetMapping("/findPasienByPeriodeMCU") // + ex(?paketId=paket123&startDate=2024-01-01&endDate=2024-12-31)
    public List<Pasien> findPasienByPaketAndTanggal(
            @RequestParam String paketId, 
            @RequestParam 
            @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate, 
            @RequestParam 
            @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        return adminService.getPasienByPaketAndTanggalDaftar(paketId, startDate, endDate);
    }

    @GetMapping("/findAllPasien")
    public List<Pasien> getAllPasien() {
        return adminService.getAllPasien();
    }
    
    @GetMapping("/findAllPaket")
    public List<PaketMCU> getAllPaket() {
        return adminService.getAllPaket();
    }
}