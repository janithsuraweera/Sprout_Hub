package com.sprouthub.sprouthub.service;

import com.sprouthub.sprouthub.dto.ForumPostDTO;
import com.sprouthub.sprouthub.model.Comment;
import com.sprouthub.sprouthub.model.ForumPost;
import com.sprouthub.sprouthub.repository.ForumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ForumService {

    @Autowired
    private ForumRepository forumRepository;

    public List<ForumPost> getAllForumPosts() {
        return forumRepository.findAll();
    }

    public Optional<ForumPost> getForumPostById(String id) {
        return forumRepository.findById(id);
    }

    public ForumPost createForumPost(ForumPostDTO forumPostDTO) {
        ForumPost forumPost = new ForumPost();
        forumPost.setTitle(forumPostDTO.getTitle());
        forumPost.setContent(forumPostDTO.getContent());
        forumPost.setAuthorId(forumPostDTO.getAuthorId());
        forumPost.setDate(new Date());
        return forumRepository.save(forumPost);
    }

    public ForumPost updateForumPost(String id, ForumPostDTO forumPostDTO) {
        Optional<ForumPost> existingForumPost = forumRepository.findById(id);
        if (existingForumPost.isPresent()) {
            ForumPost forumPost = existingForumPost.get();
            forumPost.setTitle(forumPostDTO.getTitle());
            forumPost.setContent(forumPostDTO.getContent());
            forumPost.setAuthorId(forumPostDTO.getAuthorId());
            return forumRepository.save(forumPost);
        }
        return null; // Or throw exception
    }

    public void deleteForumPost(String id) {
        forumRepository.deleteById(id);
    }

    public ForumPost addCommentToForumPost(String forumPostId, Comment comment) {
        Optional<ForumPost> existingForumPost = forumRepository.findById(forumPostId);
        if (existingForumPost.isPresent()) {
            ForumPost forumPost = existingForumPost.get();
            if (forumPost.getComments() == null) {
                forumPost.setComments(List.of(comment));
            } else {
                forumPost.getComments().add(comment);
            }
            return forumRepository.save(forumPost);
        }
        return null; // Or throw exception
    }
}