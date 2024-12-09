package com.mcu.web.controllers;

import com.mcu.web.models.PetugasAdminLab;
import com.mcu.web.models.Pasien;
import com.mcu.web.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Register Pasien
    @PostMapping("/register/pasien")
    public ResponseEntity<Pasien> registerUser(@RequestBody Pasien user) {
        return ResponseEntity.ok(authService.registerUser(user));
    }

    // Register Admin
    @PostMapping("/register/admin")
    public ResponseEntity<PetugasAdminLab> registerAdmin(@RequestBody PetugasAdminLab admin) {
        return ResponseEntity.ok(authService.registerAdmin(admin));
    }

    // Login
    @PostMapping("/login") // ex input: POST http://localhost:8080/api/auth/login?noTelp=081234567890&password=password123
    public ResponseEntity<Object> login(@RequestParam String noTelp, @RequestParam String password) {
        return ResponseEntity.ok(authService.login(noTelp, password));
    }
}
