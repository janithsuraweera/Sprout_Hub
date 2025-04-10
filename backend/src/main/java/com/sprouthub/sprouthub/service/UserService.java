package com.sprouthub.sprouthub.service;

import com.sprouthub.sprouthub.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserService extends UserDetailsService {

    User registerUser(User user);

    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

    User findByUsername(String username);
}