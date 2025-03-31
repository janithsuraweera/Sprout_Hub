package com.sprouthub.sprouthub.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "forumPosts")
@Data
public class ForumPost {

    @Id
    private String id;
    private String title;
    private String content;
    private Date date;
    private String authorId;
    private List<Comment> comments;
    // Add other relevant fields
}