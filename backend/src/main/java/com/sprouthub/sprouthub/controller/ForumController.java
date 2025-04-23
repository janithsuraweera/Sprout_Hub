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
