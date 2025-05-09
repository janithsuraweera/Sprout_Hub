package com.sprouthub.sprouthub.controller;

import com.sprouthub.sprouthub.model.User;
import com.sprouthub.sprouthub.security.JwtUtil;
import com.sprouthub.sprouthub.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            logger.debug("Registering new user with username: {} and role: {}", user.getUsername(), user.getRole());
            User registeredUser = userService.registerUser(user);
            logger.debug("User registered successfully with role: {}", registeredUser.getRole());
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            logger.error("Registration failed: {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            if (credentials.get("usernameOrEmail") == null || credentials.get("password") == null) {
                return ResponseEntity.badRequest().body("Username/Email and password are required");
            }

            logger.debug("Attempting login for user: {}", credentials.get("usernameOrEmail"));

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(credentials.get("usernameOrEmail"), credentials.get("password"))
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtil.generateToken(userDetails);

            // Get the user's authorities
            String authorities = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.joining(","));

            logger.debug("User authenticated successfully. Username: {}, Authorities: {}", 
                        userDetails.getUsername(), authorities);

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("role", authorities);
            response.put("username", userDetails.getUsername());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Login failed: {}", e.getMessage());
            if (e.getMessage().contains("Bad credentials")) {
                return ResponseEntity.badRequest().body("Invalid username/email or password");
            }
            return ResponseEntity.badRequest().body("Authentication failed: " + e.getMessage());
        }
    }
}