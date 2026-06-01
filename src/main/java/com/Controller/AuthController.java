package com.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Entity.User;
import com.Repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	

    @Autowired
    private UserRepository repo;
    
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        User dbUser = repo.findByUsername(user.getUsername());

        if (dbUser == null || !dbUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid login");
        }

        return ResponseEntity.ok(dbUser);
    }
    
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        if (repo.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest().body("User already exists");
        }

        // force every register to USER
        user.setRole("USER");

        repo.save(user);

        return ResponseEntity.ok("User registered successfully");
    }
    
    @GetMapping("/test")
    public String test() {
        return "API working";
    }
}
