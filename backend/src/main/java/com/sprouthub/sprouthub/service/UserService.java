package com.sprouthub.sprouthub.service;

import com.sprouthub.sprouthub.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

public interface UserService extends UserDetailsService {

    User registerUser(User user);

    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

    User findByUsername(String username);
    
    List<User> getAllUsers();
}