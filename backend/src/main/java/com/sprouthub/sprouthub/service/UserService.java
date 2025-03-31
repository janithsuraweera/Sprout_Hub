package com.sprouthub.sprouthub.service;

import com.sprouthub.sprouthub.model.Role;
import com.sprouthub.sprouthub.model.User;
import com.sprouthub.sprouthub.repository.RoleRepository;
import com.sprouthub.sprouthub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username is already taken!");
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email is already registered!");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleRepository.findByName("ROLE_USER");
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        user.setRoles(roles);

        return userRepository.save(user);
    }
}