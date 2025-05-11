package com.sprouthub.sprouthub.model;

import lombok.Data;
import java.util.Date;

@Data
public class Comment {
    private String id;
    private String content;
    private String author;
    private String authorId;
    private Date createdAt;
}
