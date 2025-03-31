package com.sprouthub.sprouthub.service;

import com.sprouthub.sprouthub.dto.TutorialDTO;
import com.sprouthub.sprouthub.model.Tutorial;
import com.sprouthub.sprouthub.repository.TutorialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TutorialService {

    @Autowired
    private TutorialRepository tutorialRepository;

    public List<Tutorial> getAllTutorials() {
        return tutorialRepository.findAll();
    }

    public Optional<Tutorial> getTutorialById(String id) {
        return tutorialRepository.findById(id);
    }

    public Tutorial createTutorial(TutorialDTO tutorialDTO) {
        Tutorial tutorial = new Tutorial();
        tutorial.setTitle(tutorialDTO.getTitle());
        tutorial.setContent(tutorialDTO.getContent());
        tutorial.setAuthorId(tutorialDTO.getAuthorId());
        tutorial.setDate(new Date());
        tutorial.setVideoUrl(tutorialDTO.getVideoUrl());
        tutorial.setCategory(tutorialDTO.getCategory());
        return tutorialRepository.save(tutorial);
    }

    public Tutorial updateTutorial(String id, TutorialDTO tutorialDTO) {
        Optional<Tutorial> existingTutorial = tutorialRepository.findById(id);
        if (existingTutorial.isPresent()) {
            Tutorial tutorial = existingTutorial.get();
            tutorial.setTitle(tutorialDTO.getTitle());
            tutorial.setContent(tutorialDTO.getContent());
            tutorial.setAuthorId(tutorialDTO.getAuthorId());
            tutorial.setVideoUrl(tutorialDTO.getVideoUrl());
            tutorial.setCategory(tutorialDTO.getCategory());
            return tutorialRepository.save(tutorial);
        }
        return null; // Or throw exception
    }

    public void deleteTutorial(String id) {
        tutorialRepository.deleteById(id);
    }
}