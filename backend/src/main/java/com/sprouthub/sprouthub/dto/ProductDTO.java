package com.sprouthub.sprouthub.dto;

import lombok.Data;

@Data
public class ProductDTO {

    private String name;
    private String description;
    private double price;
    private int stock;
    private String imageUrl;
    private String category;
    private String sellerId;
    // Add other relevant fields
}