package com.sprouthub.sprouthub.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
@Data
public class Product {

    @Id
    private String id;
    private String name;
    private String description;
    private double price;
    private int stock;
    private String imageUrl;
    private String category;
    private String sellerId;
    // Add other relevant fields
}