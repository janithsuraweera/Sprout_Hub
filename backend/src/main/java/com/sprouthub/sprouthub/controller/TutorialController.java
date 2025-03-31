package com.sprouthub.sprouthub.controller;

import com.sprouthub.sprouthub.dto.TutorialDTO;
import com.sprouthub.sprouthub.model.Tutorial;
import com.sprouthub.sprouthub.service.TutorialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tutorials")
public class TutorialController {

    @Autowired
    private TutorialService tutorialService;

    @GetMapping
    public ResponseEntity<List<Tutorial>> getAllTutorials() {
        return ResponseEntity.ok(tutorialService.getAllTutorials());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tutorial> getTutorialById(@PathVariable String id) {
        return tutorialService.getTutorialById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Tutorial> createTutorial(@RequestBody TutorialDTO tutorialDTO) {
        return ResponseEntity.ok(tutorialService.createTutorial(tutorialDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tutorial> updateTutorial(@PathVariable String id, @RequestBody TutorialDTO tutorialDTO) {
        Tutorial updatedTutorial = tutorialService.updateTutorial(id, tutorialDTO);
        if (updatedTutorial != null) {
            return ResponseEntity.ok(updatedTutorial);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTutorial(@PathVariable String id) {
        tutorialService.deleteTutorial(id);
        return ResponseEntity.noContent().build();
    }
}