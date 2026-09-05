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

        message.setSubject("New Order Received - Fruit Bazaar");

        message.setText(
        		"Hello Admin,\n\n" +

        "A new customer order has been received successfully.\n\n" +

        "----------------------------------\n" +
        "Order Information\n" +
        "----------------------------------\n" +
        "Order ID       : " + orderId + "\n" +
        "Customer Name  : " + customerName + "\n" +
        "Phone Number   : " + phone + "\n" +
        "Delivery Address: " + address + "\n" +
        "Total Amount   : ₹" + totalAmount + "\n" +
        "Order Status   : PLACED\n" +
        "----------------------------------\n\n" +

        "Please review the order and prepare it for delivery.\n\n" +

        "Regards,\n" +
        "Fruit Bazaar System"
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

        message.setSubject("Order Confirmed - Fruit Bazaar");

        message.setText(
        		"Dear " + customerName + ",\n\n" +

        "Thank you for shopping with Fruit Bazaar! 🍎\n\n" +

        "We are happy to inform you that your order has been placed successfully.\n\n" +

        "----------------------------------\n" +
        "Order Details\n" +
        "----------------------------------\n" +
        "Order ID      : " + orderId + "\n" +
        "Order Status  : PLACED\n" +
        "Total Amount  : ₹" + totalAmount + "\n" +
        "----------------------------------\n\n" +

        "Our team is preparing your fresh fruits and will deliver them to your provided address as soon as possible.\n\n" +

        "If you have any questions regarding your order, please feel free to contact us.\n\n" +

        "Thank you for choosing Fruit Bazaar.\n\n" +

        "Fresh Fruits | Quality Service | Happy Customers\n\n" +

        "Regards,\n" +
        "Fruit Bazaar Team"
        );

        mailSender.send(message);
    }
    
    /* Send Otp */
    public boolean sendOtpEmail(String email, String otp) {

        try {

            System.out.println("===== SENDING OTP EMAIL =====");
            System.out.println("TO : " + email);
            System.out.println("OTP : " + otp);

            SimpleMailMessage message = new SimpleMailMessage();

            message.setTo(email);
            message.setSubject("Fruit Bazaar OTP Verification");
            message.setText(
                    "Your OTP is: " + otp +
                    "\n\nValid for 5 minutes."
            );
            System.out.println("MAIL USER = " + System.getenv("MAIL_USERNAME"));
            mailSender.send(message);

            System.out.println("OTP EMAIL SENT SUCCESSFULLY");

            return true;
            
            

        } catch (Exception e) {

            System.out.println("OTP EMAIL FAILED");
            e.printStackTrace();

            return false;
        }
    }
}