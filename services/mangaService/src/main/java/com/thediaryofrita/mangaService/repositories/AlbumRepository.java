package com.thediaryofrita.mangaService.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.thediaryofrita.mangaService.models.Album;

public interface AlbumRepository extends MongoRepository<Album, String> {

} 
