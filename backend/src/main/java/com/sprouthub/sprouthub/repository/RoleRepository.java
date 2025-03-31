// package com.sprouthub.sprouthub.repository;

// import com.sprouthub.sprouthub.model.Role;
// import com.sprouthub.sprouthub.model.Role.RoleName;
// import org.springframework.data.mongodb.repository.MongoRepository;
// import org.springframework.stereotype.Repository;

// import java.util.Optional;

// @Repository
// public interface RoleRepository extends MongoRepository<Role, String> {

//     Optional<Role> findByName(RoleName roleName);
// }

package com.sprouthub.sprouthub.repository;

import com.sprouthub.sprouthub.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {
    Role findByName(String name);
}