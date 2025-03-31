package com.sprouthub.sprouthub.repository;

import com.sprouthub.sprouthub.model.ForumPost;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForumRepository extends MongoRepository<ForumPost, String> {
}