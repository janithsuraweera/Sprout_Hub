package com.sprouthub.sprouthub.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserDTO {

    private String username;
    private String email;
    private String password;
    private List<String> roles;
    private String firstName;
    private String lastName;
    private String profilePicture;
    private String bio;
    private String location;
    // Add other relevant fields
}