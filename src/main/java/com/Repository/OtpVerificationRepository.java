package com.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Entity.OtpVerification;

public interface OtpVerificationRepository  extends JpaRepository<OtpVerification, Long> {

    OtpVerification findByEmail(String email);
}