// package com.sprouthub.sprouthub.model;

// import lombok.Data;
// import org.springframework.data.annotation.Id;
// import org.springframework.data.mongodb.core.mapping.Document;

// @Data
// @Document(collection = "roles")
// public class Role {

//     @Id
//     private String id;
//     private RoleName name;

//     public enum RoleName {
//         ROLE_USER,
//         ROLE_ADMIN
//     }
// }

package com.sprouthub.sprouthub.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "roles")
public class Role {
    @Id
    private String id;
    private String name;
}