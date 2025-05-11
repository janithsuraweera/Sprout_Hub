package com.sprouthub.sprouthub.controller;

import com.sprouthub.sprouthub.model.ForumPost;
import com.sprouthub.sprouthub.model.User;
import com.sprouthub.sprouthub.model.Comment;
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
        public List<String> likedUsers;
        public int likes;
        public List<Comment> comments;

        public ForumPostDTO(ForumPost post, String authorUsername) {
            this.id = post.getId();
            this.title = post.getTitle();
            this.content = post.getContent();
            this.category = post.getCategory();
            this.createdAt = post.getCreatedAt();
            this.userId = post.getUserId();
            this.authorUsername = authorUsername;
            this.likedUsers = post.getLikedUsers();
            this.likes = post.getLikedUsers() != null ? post.getLikedUsers().size() : 0;
            this.comments = post.getComments();
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

    @PostMapping("/{id}/like")
    public ResponseEntity<ForumPostDTO> likePost(@PathVariable String id, @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String username = jwtUtil.extractUsername(token);
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        ForumPost post = forumService.getForumPostById(id);
        if (!post.getLikedUsers().contains(user.getId())) {
            post.getLikedUsers().add(user.getId());
            forumService.updateForumPost(id, post);
        }
        String authorUsername = null;
        if (post.getUserId() != null) {
            User author = userRepository.findById(post.getUserId()).orElse(null);
            if (author != null) authorUsername = author.getUsername();
        }
        return ResponseEntity.ok(new ForumPostDTO(post, authorUsername));
    }

    @PostMapping("/{id}/unlike")
    public ResponseEntity<ForumPostDTO> unlikePost(@PathVariable String id, @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String username = jwtUtil.extractUsername(token);
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        ForumPost post = forumService.getForumPostById(id);
        if (post.getLikedUsers().contains(user.getId())) {
            post.getLikedUsers().remove(user.getId());
            forumService.updateForumPost(id, post);
        }
        String authorUsername = null;
        if (post.getUserId() != null) {
            User author = userRepository.findById(post.getUserId()).orElse(null);
            if (author != null) authorUsername = author.getUsername();
        }
        return ResponseEntity.ok(new ForumPostDTO(post, authorUsername));
    }

    @PostMapping("/{postId}/comments")
    public ResponseEntity<Comment> addComment(@PathVariable String postId, @RequestBody Comment comment, @RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            String username = jwtUtil.extractUsername(token);
            User user = userRepository.findByUsername(username).orElse(null);
            if (user != null) {
                comment.setAuthor(user.getUsername());
                comment.setAuthorId(user.getId());
            }
        }
        Comment created = forumService.addComment(postId, comment);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{postId}/comments/{commentId}")
    public ResponseEntity<Comment> updateComment(@PathVariable String postId, @PathVariable String commentId, @RequestBody Comment comment, @RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }
        String token = authHeader.substring(7);
        String username = jwtUtil.extractUsername(token);
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        ForumPost post = forumService.getForumPostById(postId);
        Comment existingComment = post.getComments().stream()
            .filter(c -> c.getId().equals(commentId))
            .findFirst()
            .orElse(null);
        if (existingComment == null) {
            return ResponseEntity.notFound().build();
        }
        if (!user.getId().equals(existingComment.getAuthorId())) {
            return ResponseEntity.status(403).build();
        }
        comment.setAuthor(user.getUsername());
        comment.setAuthorId(user.getId());
        Comment updated = forumService.updateComment(postId, commentId, comment);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{postId}/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable String postId, @PathVariable String commentId, @RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }
        String token = authHeader.substring(7);
        String username = jwtUtil.extractUsername(token);
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        ForumPost post = forumService.getForumPostById(postId);
        Comment existingComment = post.getComments().stream()
            .filter(c -> c.getId().equals(commentId))
            .findFirst()
            .orElse(null);
        if (existingComment == null) {
            return ResponseEntity.notFound().build();
        }
        boolean isAuthor = user.getId().equals(existingComment.getAuthorId());
        boolean isPostOwner = user.getId().equals(post.getUserId());
        if (!isAuthor && !isPostOwner) {
            return ResponseEntity.status(403).build();
        }
        forumService.deleteComment(postId, commentId);
        return ResponseEntity.ok().build();
    }
}
