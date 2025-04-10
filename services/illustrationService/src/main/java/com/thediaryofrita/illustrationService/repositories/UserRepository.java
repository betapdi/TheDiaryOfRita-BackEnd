package com.thediaryofrita.illustrationService.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.thediaryofrita.illustrationService.models.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
}
