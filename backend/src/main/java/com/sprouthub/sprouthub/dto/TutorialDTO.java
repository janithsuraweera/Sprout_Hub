package com.sprouthub.sprouthub.dto;

import lombok.Data;

@Data
public class TutorialDTO {

    private String title;
    private String content;
    private String authorId;
    private String videoUrl;
    private String category;
    // Add other relevant fields
}