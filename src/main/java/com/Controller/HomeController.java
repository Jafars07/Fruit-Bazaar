package com.Controller;

import org.springframework.stereotype.Controller;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class HomeController {
	
	@GetMapping("/")
	public String Home(){
		return "index";
	}
	
	@GetMapping("/login")
	public String login() {
		return "login";	
	}

    @GetMapping("/cart")
    public String cart() {
        return "cart";
    }
	
	@GetMapping("/register")
	public String register() {
		return "register";
	}
	
	@GetMapping("/my-orders")
	public String myOrdersPage() {
	    return "myorder";
	}
	
	@GetMapping("/products")
	public String products() {
		return "products";
	}

	@GetMapping("/admin")
	public String admin(HttpSession session) {

	    String role = (String) session.getAttribute("role");

	    if (role == null || !role.equals("ADMIN")) {
	        return "redirect:/login";
	    }

	    return "admin";
	}
    
    @GetMapping("/order-details")
    public String orderDetailsPage() {
        return "order-details";
    }
    
    @GetMapping("/checkout")
    public String checkoutPage() {
        return "checkout";
    }
    
    @GetMapping("/admin-orders")
    public String adminOrdersPage(HttpSession session) {

        String role = (String) session.getAttribute("role");

        if (role == null || !role.equals("ADMIN")) {
            return "redirect:/login";
        }

        return "admin-orders";
    }
    
    @GetMapping("/forgot-password")
    public String forgotPassword() {
        return "forgot-password";
    }

}
