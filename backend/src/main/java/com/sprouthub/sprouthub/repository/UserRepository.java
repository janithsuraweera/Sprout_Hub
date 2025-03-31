// package com.sprouthub.sprouthub.repository;

// import com.sprouthub.sprouthub.model.User;
// import org.springframework.data.mongodb.repository.MongoRepository;
// import org.springframework.stereotype.Repository;

// import java.util.Optional;

// @Repository
// public interface UserRepository extends MongoRepository<User, String> {

//     Optional<User> findByUsername(String username);

//     Boolean existsByUsername(String username);

//     Boolean existsByEmail(String email);
// }

package com.sprouthub.sprouthub.repository;

import com.sprouthub.sprouthub.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}