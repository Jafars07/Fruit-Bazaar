package com.Controller;

import java.time.LocalDateTime;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.Entity.OtpVerification;
import com.Entity.User;
import com.Repository.OtpVerificationRepository;
import com.Repository.UserRepository;
import com.Service.EmailService;
import com.dto.OtpRequest;
import com.dto.ResetPasswordRequest;
import com.dto.VerifyOtpRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository repo;

    @Autowired
    private OtpVerificationRepository otpRepo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody User user,
            HttpSession session) {

        System.out.println("================================");
        System.out.println("USERNAME : " + user.getUsername());

        User dbUser = repo.findByUsername(user.getUsername());

        System.out.println("DB USER : " + dbUser);

        if (dbUser != null) {

            System.out.println("ROLE : " + dbUser.getRole());

            boolean match =
                    passwordEncoder.matches(
                            user.getPassword(),
                            dbUser.getPassword());

            System.out.println("PASSWORD MATCH : " + match);
        }

        if (dbUser == null ||
            !passwordEncoder.matches(
                    user.getPassword(),
                    dbUser.getPassword())) {

            return ResponseEntity.badRequest()
                    .body("Invalid login");
        }

        // SESSION STORAGE
        session.setAttribute("userId", dbUser.getId());
        session.setAttribute("username", dbUser.getUsername());
        session.setAttribute("role", dbUser.getRole());

        System.out.println("SESSION CREATED");
        System.out.println("SESSION USER : " + dbUser.getUsername());
        System.out.println("SESSION ROLE : " + dbUser.getRole());

        return ResponseEntity.ok(dbUser);
    }

    /* SEND REGISTRATION OTP */
    @PostMapping("/send-registration-otp")
    public ResponseEntity<?> sendRegistrationOtp(
            @RequestBody OtpRequest request) {

        String email = request.getUsername();

        if (email == null ||
                !email.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {

            return ResponseEntity
                    .badRequest()
                    .body("Enter valid email");
        }

        if (repo.findByUsername(email) != null) {

        	return ResponseEntity
                    .badRequest()
                    .body("USER_ALREADY_EXISTS");
        }

        String otp = String.format(
                "%04d",(int) (Math.random() * 10000));
        OtpVerification otpData =
                otpRepo.findByEmail(email);

        if (otpData == null) {
            otpData = new OtpVerification();
        }

        otpData.setEmail(email);
        otpData.setOtp(otp);
        otpData.setVerified(false);
        otpData.setExpiryTime(
                LocalDateTime.now().plusMinutes(5));

        otpRepo.save(otpData);

        boolean sent = emailService.sendOtpEmail(email, otp);

        if (!sent) {
            return ResponseEntity
                    .internalServerError()
                    .body("Failed to send OTP");
        }

        return ResponseEntity.ok("OTP Sent Successfully");
    }

    /* VERIFY OTP */
    @PostMapping("/verify-registration-otp")
    public ResponseEntity<?> verifyRegistrationOtp(
            @RequestBody VerifyOtpRequest request) {

        OtpVerification otpData =
                otpRepo.findByEmail(request.getUsername());

        if (otpData == null) {

            return ResponseEntity
                    .badRequest()
                    .body("OTP not found");
        }

        if (otpData.getOtp() == null ||
                !otpData.getOtp().equals(request.getOtp())) {

            return ResponseEntity
                    .badRequest()
                    .body("Invalid OTP");
        }

        if (otpData.getExpiryTime()
                .isBefore(LocalDateTime.now())) {

            return ResponseEntity
                    .badRequest()
                    .body("OTP Expired");
        }

        otpData.setVerified(true);

        otpRepo.save(otpData);

        return ResponseEntity.ok("OTP Verified Successfully");
    }

    /* REGISTER USER */
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody User user) {

        if (repo.findByUsername(user.getUsername()) != null) {

            return ResponseEntity
                    .badRequest()
                    .body("User already exists");
        }

        OtpVerification otpData =
                otpRepo.findByEmail(user.getUsername());

        if (otpData == null || !otpData.isVerified()) {

            return ResponseEntity
                    .badRequest()
                    .body("Verify OTP First");
        }

        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()));

        user.setRole("USER");

        repo.save(user);

        otpRepo.delete(otpData);

        return ResponseEntity
                .ok("User Registered Successfully");
    }
    
    //forget password
    @PostMapping("/send-forgot-password-otp")
    public ResponseEntity<?> sendForgotPasswordOtp(
            @RequestBody OtpRequest request) {

        String email = request.getUsername();

        User user = repo.findByUsername(email);

        if (user == null) {
            return ResponseEntity.badRequest()
                    .body("User not found");
        }

        String otp = String.valueOf(
                (int)(1000 + Math.random() * 9000));

        OtpVerification otpData =
                otpRepo.findByEmail(email);

        if (otpData == null) {
            otpData = new OtpVerification();
        }

        otpData.setEmail(email);
        otpData.setOtp(otp);
        otpData.setVerified(false);
        otpData.setExpiryTime(
                LocalDateTime.now().plusMinutes(5));

        otpRepo.save(otpData);

        boolean sent = emailService.sendOtpEmail(email, otp);

        if (!sent) {
            return ResponseEntity
                    .internalServerError()
                    .body("Failed to send OTP");
        }

        return ResponseEntity.ok("OTP Sent");
    }
    
    @PostMapping("/verify-forgot-password-otp")
    public ResponseEntity<?> verifyForgotPasswordOtp(
            @RequestBody VerifyOtpRequest request) {

        OtpVerification otpData =
                otpRepo.findByEmail(request.getUsername());

        if (otpData == null) {
            return ResponseEntity.badRequest()
                    .body("OTP not found");
        }

        if (!otpData.getOtp().equals(request.getOtp())) {
            return ResponseEntity.badRequest()
                    .body("Invalid OTP");
        }

        if (otpData.getExpiryTime()
                .isBefore(LocalDateTime.now())) {

            return ResponseEntity.badRequest()
                    .body("OTP Expired");
        }

        otpData.setVerified(true);
        otpRepo.save(otpData);

        return ResponseEntity.ok("OTP Verified");
    }
    
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestBody ResetPasswordRequest request) {

        User user =
                repo.findByUsername(request.getUsername());

        if (user == null) {
            return ResponseEntity.badRequest()
                    .body("User not found");
        }

        OtpVerification otpData =
                otpRepo.findByEmail(request.getUsername());

        if (otpData == null || !otpData.isVerified()) {

            return ResponseEntity.badRequest()
                    .body("Verify OTP First");
        }

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()));

        repo.save(user);

        otpRepo.delete(otpData);

        return ResponseEntity.ok(
                "Password Updated Successfully");
    }
    
    

    @GetMapping("/test")
    public String test() {
        return "API Working";
    }
}
