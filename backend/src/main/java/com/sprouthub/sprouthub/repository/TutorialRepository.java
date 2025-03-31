package com.sprouthub.sprouthub.repository;

import com.sprouthub.sprouthub.model.Tutorial;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutorialRepository extends MongoRepository<Tutorial, String> {
}