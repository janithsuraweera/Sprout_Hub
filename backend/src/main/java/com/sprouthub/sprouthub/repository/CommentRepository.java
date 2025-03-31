package com.sprouthub.sprouthub.repository;

import com.sprouthub.sprouthub.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
}