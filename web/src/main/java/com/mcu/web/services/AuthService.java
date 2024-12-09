package com.mcu.web.services;

import com.mcu.web.models.PetugasAdminLab;
import com.mcu.web.models.Pasien;
import com.mcu.web.repositories.PetugasAdminLabRepository;
import com.mcu.web.repositories.PasienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private PasienRepository pasienRepository;

    @Autowired
    private PetugasAdminLabRepository adminRepository;

    // Register Pasien
    public Pasien registerUser(Pasien user) {
        if (pasienRepository.findByNoTelp(user.getNoTelp()).isPresent()) {
            throw new RuntimeException("Nomor telepon sudah digunakan.");
        }
        return pasienRepository.save(user);
    }

    // Register Admin
    public PetugasAdminLab registerAdmin(PetugasAdminLab admin) {
        if (adminRepository.findByNoTelp(admin.getNoTelp()).isPresent()) {
            throw new RuntimeException("Nomor telepon sudah digunakan.");
        }
        return adminRepository.save(admin);
    }

    // Login
    public Object login(String noTelp, String password) {
        Optional<Pasien> user = pasienRepository.findByNoTelp(noTelp);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user.get();
        }
        Optional<PetugasAdminLab> admin = adminRepository.findByNoTelp(noTelp);
        if (admin.isPresent() && admin.get().getPassword().equals(password)) {
            return admin.get();
        }
        throw new RuntimeException("Nomor telepon atau password salah.");
    }
}
