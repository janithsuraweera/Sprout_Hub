package com.sprouthub.sprouthub.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "plantPosts")
@Data
public class PlantPost {

    @Id
    private String id;
    private String title;
    private String content;
    private Date date;
    private String authorId;
    private String imageUrl;
    private String category;
    // Add other relevant fields
}