package com.example.theatre.repository;

import com.example.theatre.entity.PlayEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface PlayRepository extends JpaRepository<PlayEntity, Long> {

    List<PlayEntity> getPlayEntitiesByStartDate(Instant date);
}
