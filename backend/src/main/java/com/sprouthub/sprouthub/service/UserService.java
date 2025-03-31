package com.sprouthub.sprouthub.service;

import com.sprouthub.sprouthub.dto.UserDTO;
import com.sprouthub.sprouthub.model.User;
import com.sprouthub.sprouthub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public User createUser(UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword()); // In real app, hash password
        user.setRoles(userDTO.getRoles());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setProfilePicture(userDTO.getProfilePicture());
        user.setBio(userDTO.getBio());
        user.setLocation(userDTO.getLocation());
        return userRepository.save(user);
    }

    public User updateUser(String id, UserDTO userDTO) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setUsername(userDTO.getUsername());
            user.setEmail(userDTO.getEmail());
            user.setPassword(userDTO.getPassword()); // In real app, hash password
            user.setRoles(userDTO.getRoles());
            user.setFirstName(userDTO.getFirstName());
            user.setLastName(userDTO.getLastName());
            user.setProfilePicture(userDTO.getProfilePicture());
            user.setBio(userDTO.getBio());
            user.setLocation(userDTO.getLocation());
            return userRepository.save(user);
        }
        return null; // Or throw exception
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    public Optional<User> findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public Boolean existsByUsername(String username){
        return userRepository.existsByUsername(username);
    }

    public Boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);
    }
}