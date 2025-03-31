package com.sprouthub.sprouthub.controller;

import com.sprouthub.sprouthub.dto.PlantPostDTO;
import com.sprouthub.sprouthub.model.PlantPost;
import com.sprouthub.sprouthub.service.PlantPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plantPosts")
public class PlantPostController {

    @Autowired
    private PlantPostService plantPostService;

    @GetMapping
    public ResponseEntity<List<PlantPost>> getAllPlantPosts() {
        return ResponseEntity.ok(plantPostService.getAllPlantPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlantPost> getPlantPostById(@PathVariable String id) {
        return plantPostService.getPlantPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PlantPost> createPlantPost(@RequestBody PlantPostDTO plantPostDTO) {
        return ResponseEntity.ok(plantPostService.createPlantPost(plantPostDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlantPost> updatePlantPost(@PathVariable String id, @RequestBody PlantPostDTO plantPostDTO) {
        PlantPost updatedPlantPost = plantPostService.updatePlantPost(id, plantPostDTO);
        if (updatedPlantPost != null) {
            return ResponseEntity.ok(updatedPlantPost);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlantPost(@PathVariable String id) {
        plantPostService.deletePlantPost(id);
        return ResponseEntity.noContent().build();
    }
}