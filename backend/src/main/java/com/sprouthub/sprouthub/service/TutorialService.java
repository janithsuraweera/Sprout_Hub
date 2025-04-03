package com.sprouthub.sprouthub.service;

import com.sprouthub.sprouthub.model.Tutorial;

import java.util.List;

public interface TutorialService {
    Tutorial createTutorial(Tutorial tutorial);
    Tutorial getTutorialById(String id);
    List<Tutorial> getAllTutorials();
    Tutorial updateTutorial(String id, Tutorial tutorial);
    void deleteTutorial(String id);
}