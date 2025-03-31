package com.sprouthub.sprouthub.dto;

import lombok.Data;

@Data
public class PlantPostDTO {

    private String title;
    private String content;
    private String authorId;
    private String imageUrl;
    private String category;
    // Add other relevant fields
}