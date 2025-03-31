package com.sprouthub.sprouthub.service;

import com.sprouthub.sprouthub.dto.PlantPostDTO;
import com.sprouthub.sprouthub.model.PlantPost;
import com.sprouthub.sprouthub.repository.PlantPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PlantPostService {

    @Autowired
    private PlantPostRepository plantPostRepository;

    public List<PlantPost> getAllPlantPosts() {
        return plantPostRepository.findAll();
    }

    public Optional<PlantPost> getPlantPostById(String id) {
        return plantPostRepository.findById(id);
    }

    public PlantPost createPlantPost(PlantPostDTO plantPostDTO) {
        PlantPost plantPost = new PlantPost();
        plantPost.setTitle(plantPostDTO.getTitle());
        plantPost.setContent(plantPostDTO.getContent());
        plantPost.setAuthorId(plantPostDTO.getAuthorId());
        plantPost.setDate(new Date());
        plantPost.setImageUrl(plantPostDTO.getImageUrl());
        plantPost.setCategory(plantPostDTO.getCategory());
        return plantPostRepository.save(plantPost);
    }

    public PlantPost updatePlantPost(String id, PlantPostDTO plantPostDTO) {
        Optional<PlantPost> existingPlantPost = plantPostRepository.findById(id);
        if (existingPlantPost.isPresent()) {
            PlantPost plantPost = existingPlantPost.get();
            plantPost.setTitle(plantPostDTO.getTitle());
            plantPost.setContent(plantPostDTO.getContent());
            plantPost.setAuthorId(plantPostDTO.getAuthorId());
            plantPost.setImageUrl(plantPostDTO.getImageUrl());
            plantPost.setCategory(plantPostDTO.getCategory());
            return plantPostRepository.save(plantPost);
        }
        return null; // Or throw exception
    }

    public void deletePlantPost(String id) {
        plantPostRepository.deleteById(id);
    }
}