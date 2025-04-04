package com.sprouthub.sprouthub.controller;

import com.sprouthub.sprouthub.model.User;
import com.sprouthub.sprouthub.security.JwtUtil;
import com.sprouthub.sprouthub.service.UserServiceImpl; // UserService වෙනුවට UserServiceImpl භාවිතා කරන්න.
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserServiceImpl userService; 

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // @PostMapping("/login")
    // public ResponseEntity<?> login(@RequestBody User user) {
    //     try {
    //         System.out.println("Attempting login for user: " + user.getUsername()); // ලොග් එකතු කරන්න
    
    //         Authentication authentication = authenticationManager.authenticate(
    //                 new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
    //         );
    
    //         System.out.println("User authenticated successfully: " + authentication.getName()); // ලොග් එකතු කරන්න
    
    //         UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    //         String token = jwtUtil.generateToken(userDetails);
    
    //         Map<String, Object> response = new HashMap<>();
    //         response.put("token", token);
    //         response.put("role", userDetails.getAuthorities().iterator().next().getAuthority());
    
    //         return ResponseEntity.ok(response);
    //     } catch (Exception e) {
    //         System.err.println("Login failed: " + e.getMessage()); // දෝෂය ලොග් කරන්න
    //         return ResponseEntity.badRequest().body("Invalid username or password.......");
    //     }



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            System.out.println("Attempting login for user: " + credentials.get("username"));

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(credentials.get("username"), credentials.get("password"))
            );

            System.out.println("User authenticated successfully: " + authentication.getName());

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtil.generateToken(userDetails);

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("role", userDetails.getAuthorities().iterator().next().getAuthority());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Login failed: " + e.getMessage());
            return ResponseEntity.badRequest().body("Invalid username or password.......");
        }


    }
}