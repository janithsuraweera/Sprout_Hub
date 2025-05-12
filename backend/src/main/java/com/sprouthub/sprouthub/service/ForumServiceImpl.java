package com.sprouthub.sprouthub.service;

import com.sprouthub.sprouthub.exception.ForumNotFoundException;
import com.sprouthub.sprouthub.model.ForumPost;
import com.sprouthub.sprouthub.repository.ForumPostRepository;
import com.sprouthub.sprouthub.model.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.Date;

@Service
public class ForumServiceImpl implements ForumService {

    @Autowired
    private ForumPostRepository forumPostRepository;

    @Override
    public ForumPost createForumPost(ForumPost forumPost) {
        return forumPostRepository.save(forumPost);
    }

    @Override
    public ForumPost getForumPostById(String id) {
        return forumPostRepository.findById(id).orElseThrow(() -> new ForumNotFoundException("Forum post not found with id: " + id));
    }

    @Override
    public List<ForumPost> getAllForumPosts() {
        return forumPostRepository.findAll();
    }

    @Override
    public ForumPost updateForumPost(String id, ForumPost forumPost) {
        ForumPost existingPost = forumPostRepository.findById(id)
            .orElseThrow(() -> new ForumNotFoundException("Forum post not found with id: " + id));

        // Only update allowed fields
        existingPost.setTitle(forumPost.getTitle());
        existingPost.setContent(forumPost.getContent());
        existingPost.setCategory(forumPost.getCategory());
        // No tags field to update

        return forumPostRepository.save(existingPost);
    }

    @Override
    public void deleteForumPost(String id) {
        if (!forumPostRepository.existsById(id)) {
            throw new ForumNotFoundException("Forum post not found with id: " + id);
        }
        forumPostRepository.deleteById(id);
    }

    @Override
    public Comment addComment(String postId, Comment comment) {
        ForumPost post = getForumPostById(postId);
        comment.setId(UUID.randomUUID().toString());
        comment.setCreatedAt(new Date());
        post.getComments().add(comment);
        forumPostRepository.save(post);
        return comment;
    }

    @Override
    public Comment updateComment(String postId, String commentId, Comment updatedComment) {
        ForumPost post = getForumPostById(postId);
        for (Comment comment : post.getComments()) {
            if (comment.getId().equals(commentId)) {
                comment.setContent(updatedComment.getContent());
                // Optionally update author, etc.
                forumPostRepository.save(post);
                return comment;
            }
        }
        throw new RuntimeException("Comment not found");
    }

    @Override
    public void deleteComment(String postId, String commentId) {
        ForumPost post = getForumPostById(postId);
        post.getComments().removeIf(comment -> comment.getId().equals(commentId));
        forumPostRepository.save(post);
    }
}