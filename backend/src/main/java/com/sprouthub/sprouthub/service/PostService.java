package com.sprouthub.sprouthub.service;

import com.sprouthub.sprouthub.model.Post;

import java.util.List;

public interface PostService {
    Post createPost(Post post);
    Post getPostById(String id);
    List<Post> getAllPosts();
    Post updatePost(String id, Post post);
    void deletePost(String id);
}