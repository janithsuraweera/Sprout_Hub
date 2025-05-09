package com.sprouthub.sprouthub.controller;

import com.sprouthub.sprouthub.model.ForumPost;
import com.sprouthub.sprouthub.model.User;
import com.sprouthub.sprouthub.repository.UserRepository;
import com.sprouthub.sprouthub.security.JwtUtil;
import com.sprouthub.sprouthub.service.ForumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/forum")
public class ForumController {

    @Autowired
    private ForumService forumService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<ForumPost> createForumPost(@RequestBody ForumPost forumPost, @RequestHeader(value = "Authorization", required = false) String authHeader) {
        forumPost.setCreatedAt(new Date());
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            String username = jwtUtil.extractUsername(token);
            User user = userRepository.findByUsername(username).orElse(null);
            if (user != null) {
                forumPost.setUserId(user.getId());
            }
        }
        return ResponseEntity.ok(forumService.createForumPost(forumPost));
    }

    // DTO for frontend
    public static class ForumPostDTO {
        public String id;
        public String title;
        public String content;
        public String category;
        public Date createdAt;
        public String userId;
        public String authorUsername;

        public ForumPostDTO(ForumPost post, String authorUsername) {
            this.id = post.getId();
            this.title = post.getTitle();
            this.content = post.getContent();
            this.category = post.getCategory();
            this.createdAt = post.getCreatedAt();
            this.userId = post.getUserId();
            this.authorUsername = authorUsername;
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ForumPostDTO> getForumPostById(@PathVariable String id) {
        ForumPost post = forumService.getForumPostById(id);
        String authorUsername = null;
        if (post.getUserId() != null) {
            User user = userRepository.findById(post.getUserId()).orElse(null);
            if (user != null) authorUsername = user.getUsername();
        }
        return ResponseEntity.ok(new ForumPostDTO(post, authorUsername));
    }

    @GetMapping
    public ResponseEntity<List<ForumPostDTO>> getAllForumPosts() {
        List<ForumPost> posts = forumService.getAllForumPosts();
        List<ForumPostDTO> dtos = posts.stream().map(post -> {
            String authorUsername = null;
            if (post.getUserId() != null) {
                User user = userRepository.findById(post.getUserId()).orElse(null);
                if (user != null) authorUsername = user.getUsername();
            }
            return new ForumPostDTO(post, authorUsername);
        }).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
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
