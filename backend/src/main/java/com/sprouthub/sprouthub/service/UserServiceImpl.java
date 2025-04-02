package com.sprouthub.sprouthub.service;

import com.sprouthub.sprouthub.model.User;
import com.sprouthub.sprouthub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole())
                .build();
    }


    //check my code in password user name and password is correct or not
    // @Override
    // public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    //     User user = userRepository.findByUsername(username).orElse(null);
    //     if (user != null) {
    //         // පරිශීලකයා හමු විය.
    //         System.out.println("User found: " + user.getUsername()); // පරිශීලක නාමය මුද්‍රණය කරන්න.
    //         if (passwordEncoder.matches("password123", user.getPassword())) { // ඔබගේ මුරපදය මෙතනට දමන්න.
    //             System.out.println("Password matched for user: " + user.getUsername()); // මුරපදය ගැළපෙන බව මුද්‍රණය කරන්න.
    //             return org.springframework.security.core.userdetails.User.builder()
    //                 .username(user.getUsername())
    //                 .password(user.getPassword())
    //                 .roles(user.getRole())
    //                 .build();
    //         } else {
    //             System.out.println("Password did not match for user: " + user.getUsername()); // මුරපදය නොගැළපෙන බව මුද්‍රණය කරන්න.
    //             throw new UsernameNotFoundException("Invalid username or password");
    //         }
    //     } else {
    //         System.out.println("User not found: " + username); // පරිශීලක නාමය මුද්‍රණය කරන්න.
    //         throw new UsernameNotFoundException("User not found with username: " + username);
    //     }
    // }



    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
}
// package com.sprouthub.sprouthub.service;

// import com.sprouthub.sprouthub.model.User;
// import com.sprouthub.sprouthub.repository.UserRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// @Service
// public class UserServiceImpl implements UserService {

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private PasswordEncoder passwordEncoder;

//     @Override
//     public User registerUser(User user) {
//         user.setPassword(passwordEncoder.encode(user.getPassword()));
//         return userRepository.save(user);
//     }

//     @Override
//     public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//         User user = userRepository.findByUsername(username)
//                 .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

//         return org.springframework.security.core.userdetails.User.builder()
//                 .username(user.getUsername())
//                 .password(user.getPassword())
//                 .roles(user.getRole())
//                 .build();
//     }

//     @Override
//     public User findByUsername(String username) {
//         return userRepository.findByUsername(username).orElse(null);
//     }
// }