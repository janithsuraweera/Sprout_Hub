package com.sprouthub.sprouthub.controller;

import com.sprouthub.sprouthub.dto.ForumPostDTO;
import com.sprouthub.sprouthub.model.Comment;
import com.sprouthub.sprouthub.model.ForumPost;
import com.sprouthub.sprouthub.service.ForumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forumPosts")
public class ForumController {

    @Autowired
    private ForumService forumService;

    @GetMapping
    public ResponseEntity<List<ForumPost>> getAllForumPosts() {
        return ResponseEntity.ok(forumService.getAllForumPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ForumPost> getForumPostById(@PathVariable String id) {
        return forumService.getForumPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ForumPost> createForumPost(@RequestBody ForumPostDTO forumPostDTO) {
        return ResponseEntity.ok(forumService.createForumPost(forumPostDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ForumPost> updateForumPost(@PathVariable String id, @RequestBody ForumPostDTO forumPostDTO) {
        ForumPost updatedForumPost = forumService.updateForumPost(id, forumPostDTO);
        if (updatedForumPost != null) {
            return ResponseEntity.ok(updatedForumPost);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteForumPost(@PathVariable String id) {
        forumService.deleteForumPost(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<ForumPost> addCommentToForumPost(@PathVariable String id, @RequestBody Comment comment) {
        ForumPost updatedForumPost = forumService.addCommentToForumPost(id, comment);
        if (updatedForumPost != null) {
            return ResponseEntity.ok(updatedForumPost);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}