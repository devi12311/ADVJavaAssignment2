package com.example.theatre.repository;

import com.example.theatre.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// Defines a repository which provides an API or a list of helpful functions
// that helps us to work with the User entity
public interface UserRepo extends JpaRepository<UserEntity, Long> {
    // Defines a custom method to find a User using the email attribute
    Optional<UserEntity> findByEmail(String email);
    Boolean existsByEmail(String email);
}
