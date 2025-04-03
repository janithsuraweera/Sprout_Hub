package com.sprouthub.sprouthub.repository;

import com.sprouthub.sprouthub.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {
}
