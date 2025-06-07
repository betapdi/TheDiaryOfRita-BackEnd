package com.thediaryofrita.mangaService.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.thediaryofrita.mangaService.models.Manga;

public interface MangaRepository extends MongoRepository<Manga, String> {

} 