package com.thediaryofrita.mangaService.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.thediaryofrita.mangaService.models.Category;

public interface CategoryRepository extends MongoRepository<Category, String> {

} 