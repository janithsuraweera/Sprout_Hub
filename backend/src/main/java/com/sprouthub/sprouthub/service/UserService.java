package com.sprouthub.sprouthub.service;

import com.sprouthub.sprouthub.model.Role;
import com.sprouthub.sprouthub.model.User;
import com.sprouthub.sprouthub.repository.RoleRepository;
import com.sprouthub.sprouthub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Collections;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public User registerUser(String username, String email, String password) {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username is already taken.");
        }
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email is already in use.");
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));

        Role userRole = roleRepository.findByName("USER")
                .orElseGet(() -> {
                    Role newUserRole = new Role();
                    newUserRole.setName("USER");
                    return roleRepository.save(newUserRole);
                });

        user.setRoles(Collections.singletonList(userRole.getName()));
        return userRepository.save(user);
    }

    public User getUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found."));
    }

    // Add other user service methods (update, delete, etc.) here
}