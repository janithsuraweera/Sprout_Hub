package com.sprouthub.sprouthub.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "comments")
public class Comment {

    @Id
    private String id;
    private String content;
    private LocalDateTime createdAt;

    @DBRef
    private User user; // අදහස දැමූ පරිශීලකයා

    @DBRef
    private Object parent; // අදහස සම්බන්ධ වන post/tutorial/product වැනි දෙය

    // parent එකේ වර්ගය (post, tutorial, product) හඳුනාගැනීම සඳහා type එකක් අවශ්‍ය නම්, එය මෙසේ එකතු කල හැක.
    private String parentType; // "post", "tutorial", "product" වැනි වර්ගය

}