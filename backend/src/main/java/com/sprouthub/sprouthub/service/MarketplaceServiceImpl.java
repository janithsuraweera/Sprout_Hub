package com.sprouthub.sprouthub.service;

import com.sprouthub.sprouthub.exception.ProductNotFoundException;
import com.sprouthub.sprouthub.model.Product;
import com.sprouthub.sprouthub.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarketplaceServiceImpl implements MarketplaceService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product getProductById(String id) {
        return productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + id));
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product updateProduct(String id, Product product) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException("Product not found with id: " + id);
        }
        product.setId(id);
        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(String id) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }
}