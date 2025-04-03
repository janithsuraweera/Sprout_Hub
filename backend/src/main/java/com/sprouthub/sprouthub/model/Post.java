package com.sprouthub.sprouthub.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "posts")
@Data
public class Post {

    @Id
    private String id;
    private String title;
    private String content;
    private Date createdAt;
    private String userId; // This is the user who created the post

    //kemathi fills danna pluwn
}