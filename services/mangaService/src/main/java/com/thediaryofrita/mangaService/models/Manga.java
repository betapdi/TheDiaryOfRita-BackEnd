package com.thediaryofrita.mangaService.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Document(collection = "Manga")
public class Manga {
  @Id
  private String id;

  private String description;

  private String coverUrl;

  private Integer views;
  private Integer favorites;

  private Float totalStars;
  private Integer totalVotes;

  private LocalDateTime created;
  private LocalDateTime updated;

  @Builder.Default
  @DBRef
  private List<Category> categories = new ArrayList<>();
}
