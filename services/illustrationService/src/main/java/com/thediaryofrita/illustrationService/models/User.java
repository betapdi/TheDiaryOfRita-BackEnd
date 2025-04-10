package com.thediaryofrita.illustrationService.models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

@Data
@Builder
@Jacksonized
@Document(collection = "users")
public class User {
    @Id
    String id;
    String name;
    int age;
}