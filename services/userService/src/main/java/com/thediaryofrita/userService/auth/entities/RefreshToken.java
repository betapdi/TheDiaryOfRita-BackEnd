package com.thediaryofrita.userService.auth.entities;

import java.time.Instant;

import jakarta.persistence.Id;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "Refresh Token")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tokenId;

    @Column(name = "refreshToken", nullable = false, length = 300, unique = true)
    @NotBlank(message = "Please enter refresh token value!")
    @Size(max = 300)
    private String refreshToken;

    private Instant expirationTime;

    @OneToOne(mappedBy = "refreshToken")
    private User user;
}
