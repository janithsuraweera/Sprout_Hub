package com.sprouthub.sprouthub.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "users")
@Data
public class User {

    @Id
    private String id;
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