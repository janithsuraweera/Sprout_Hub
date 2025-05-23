package com.sprouthub.sprouthub.controller;

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

    @PostMapping
    public ResponseEntity<Tutorial> createTutorial(@RequestBody Tutorial tutorial) {
        return ResponseEntity.ok(tutorialService.createTutorial(tutorial));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tutorial> getTutorialById(@PathVariable String id) {
        return ResponseEntity.ok(tutorialService.getTutorialById(id));
    }

    @GetMapping
    public ResponseEntity<List<Tutorial>> getAllTutorials() {
        return ResponseEntity.ok(tutorialService.getAllTutorials());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tutorial> updateTutorial(@PathVariable String id, @RequestBody Tutorial tutorial) {
        return ResponseEntity.ok(tutorialService.updateTutorial(id, tutorial));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTutorial(@PathVariable String id) {
        tutorialService.deleteTutorial(id);
        return ResponseEntity.ok().build();
    }
}