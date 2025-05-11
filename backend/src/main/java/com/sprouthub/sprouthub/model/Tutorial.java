package com.sprouthub.sprouthub.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "tutorials")
@Data
public class Tutorial {

    @Id
    private String id;
    private String title;
    private String description;
    private String videoUrl;
    private Date createdAt;
    private String userId; // This is the user who created the tutorial
    private String author; // Username of the tutorial creator
}