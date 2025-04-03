package com.sprouthub.sprouthub.service;

import com.sprouthub.sprouthub.model.Product;

import java.util.List;

public interface MarketplaceService {
    Product createProduct(Product product);
    Product getProductById(String id);
    List<Product> getAllProducts();
    Product updateProduct(String id, Product product);
    void deleteProduct(String id);
}