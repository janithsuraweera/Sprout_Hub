package com.sprouthub.sprouthub.service;

import com.sprouthub.sprouthub.exception.TutorialNotFoundException;
import com.sprouthub.sprouthub.model.Tutorial;
import com.sprouthub.sprouthub.repository.TutorialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TutorialServiceImpl implements TutorialService {

    @Autowired
    private TutorialRepository tutorialRepository;

    @Override
    public Tutorial createTutorial(Tutorial tutorial) {
        return tutorialRepository.save(tutorial);
    }

    @Override
    public Tutorial getTutorialById(String id) {
        return tutorialRepository.findById(id).orElseThrow(() -> new TutorialNotFoundException("Tutorial not found with id: " + id));
    }

    @Override
    public List<Tutorial> getAllTutorials() {
        return tutorialRepository.findAll();
    }

    @Override
    public Tutorial updateTutorial(String id, Tutorial tutorial) {
        if (!tutorialRepository.existsById(id)) {
            throw new TutorialNotFoundException("Tutorial not found with id: " + id);
        }
        tutorial.setId(id);
        return tutorialRepository.save(tutorial);
    }

    @Override
    public void deleteTutorial(String id) {
        if (!tutorialRepository.existsById(id)) {
            throw new TutorialNotFoundException("Tutorial not found with id: " + id);
        }
        tutorialRepository.deleteById(id);
    }
}