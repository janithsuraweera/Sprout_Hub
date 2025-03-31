package com.sprouthub.sprouthub.controller;

import com.sprouthub.sprouthub.dto.ProductDTO;
import com.sprouthub.sprouthub.model.Product;
import com.sprouthub.sprouthub.service.MarketplaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class MarketplaceController {

    @Autowired
    private MarketplaceService marketplaceService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(marketplaceService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        return marketplaceService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductDTO productDTO) {
        return ResponseEntity.ok(marketplaceService.createProduct(productDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody ProductDTO productDTO) {
        Product updatedProduct = marketplaceService.updateProduct(id, productDTO);
        if (updatedProduct != null) {
            return ResponseEntity.ok(updatedProduct);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        marketplaceService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}