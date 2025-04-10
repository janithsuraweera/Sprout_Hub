package com.sprouthub.sprouthub.controller;

import com.sprouthub.sprouthub.model.ForumPost;
import com.sprouthub.sprouthub.service.ForumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forum")
public class ForumController {

    @Autowired
    private ForumService forumService;

    @PostMapping
    public ResponseEntity<ForumPost> createForumPost(@RequestBody ForumPost forumPost) {
        return ResponseEntity.ok(forumService.createForumPost(forumPost));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ForumPost> getForumPostById(@PathVariable String id) {
        return ResponseEntity.ok(forumService.getForumPostById(id));
    }

    @GetMapping
    public ResponseEntity<List<ForumPost>> getAllForumPosts() {
        return ResponseEntity.ok(forumService.getAllForumPosts());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ForumPost> updateForumPost(@PathVariable String id, @RequestBody ForumPost forumPost) {
        return ResponseEntity.ok(forumService.updateForumPost(id, forumPost));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteForumPost(@PathVariable String id) {
        forumService.deleteForumPost(id);
        return ResponseEntity.ok().build();
    }
}