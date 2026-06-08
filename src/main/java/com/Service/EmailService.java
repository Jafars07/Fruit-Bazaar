package com.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOrderNotification(
            Long orderId,
            String customerName,
            String phone,
            String address,
            double totalAmount) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo("jsadiq7713@gmail.com");

        message.setSubject("New Fruit Order Received");

        message.setText(
                "New Order Received\n\n" +
                "Order ID: " + orderId + "\n" +
                "Customer: " + customerName + "\n" +
                "Phone: " + phone + "\n" +
                "Address: " + address + "\n" +
                "Total Amount: ₹" + totalAmount
        );

        mailSender.send(message);
    }
    
	/* Customer Confirmation */
    public void sendCustomerConfirmationEmail(
            String customerEmail,
            String customerName,
            Long orderId,
            double totalAmount) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(customerEmail);

        message.setSubject("Order Confirmed - Fruit Shop");

        message.setText(
                "Dear " + customerName + ",\n\n" +
                "Your order has been placed successfully.\n\n" +
                "Order ID: " + orderId + "\n" +
                "Total Amount: ₹" + totalAmount + "\n\n" +
                "Thank you for shopping with us.\n\n" +
                "Fruit Shop Team"
        );

        mailSender.send(message);
    }
}