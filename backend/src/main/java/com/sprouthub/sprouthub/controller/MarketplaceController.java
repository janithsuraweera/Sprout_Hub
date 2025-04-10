package com.sprouthub.sprouthub.controller;

import com.sprouthub.sprouthub.model.Product;
import com.sprouthub.sprouthub.service.MarketplaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marketplace")
public class MarketplaceController {

    @Autowired
    private MarketplaceService marketplaceService;

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        return ResponseEntity.ok(marketplaceService.createProduct(product));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        return ResponseEntity.ok(marketplaceService.getProductById(id));
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(marketplaceService.getAllProducts());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody Product product) {
        return ResponseEntity.ok(marketplaceService.updateProduct(id, product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        marketplaceService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
}