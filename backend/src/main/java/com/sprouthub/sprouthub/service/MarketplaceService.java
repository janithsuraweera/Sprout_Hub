package com.sprouthub.sprouthub.service;

import com.sprouthub.sprouthub.dto.ProductDTO;
import com.sprouthub.sprouthub.model.Product;
import com.sprouthub.sprouthub.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MarketplaceService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    public Product createProduct(ProductDTO productDTO) {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setStock(productDTO.getStock());
        product.setImageUrl(productDTO.getImageUrl());
        product.setCategory(productDTO.getCategory());
        product.setSellerId(productDTO.getSellerId());
        return productRepository.save(product);
    }

    public Product updateProduct(String id, ProductDTO productDTO) {
        Optional<Product> existingProduct = productRepository.findById(id);
        if (existingProduct.isPresent()) {
            Product product = existingProduct.get();
            product.setName(productDTO.getName());
            product.setDescription(productDTO.getDescription());
            product.setPrice(productDTO.getPrice());
            product.setStock(productDTO.getStock());
            product.setImageUrl(productDTO.getImageUrl());
            product.setCategory(productDTO.getCategory());
            product.setSellerId(productDTO.getSellerId());
            return productRepository.save(product);
        }
        return null; // Or throw exception
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }
}