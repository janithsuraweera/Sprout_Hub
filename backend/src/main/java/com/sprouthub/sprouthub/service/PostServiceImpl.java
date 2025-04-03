package com.sprouthub.sprouthub.service;

import com.sprouthub.sprouthub.exception.PostNotFoundException;
import com.sprouthub.sprouthub.model.Post;
import com.sprouthub.sprouthub.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Override
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public Post getPostById(String id) {
        return postRepository.findById(id).orElseThrow(() -> new PostNotFoundException("Post not found with id: " + id));
    }

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public Post updatePost(String id, Post post) {
        if (!postRepository.existsById(id)) {
            throw new PostNotFoundException("Post not found with id: " + id);
        }
        post.setId(id);
        return postRepository.save(post);
    }

    @Override
    public void deletePost(String id) {
        if (!postRepository.existsById(id)) {
            throw new PostNotFoundException("Post not found with id: " + id);
        }
        postRepository.deleteById(id);
    }
}