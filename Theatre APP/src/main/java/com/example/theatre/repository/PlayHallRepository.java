package com.example.theatre.repository;

import com.example.theatre.entity.PlayHallEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlayHallRepository extends JpaRepository<PlayHallEntity, Long> {

    List<PlayHallEntity> getPlayHallEntitiesByPlayId(Long playId);
    List<PlayHallEntity> getPlayHallEntitiesByHallId(Long hallId);

    PlayHallEntity getPlayHallEntityByHallIdAndPlayId(Long hallId, Long playId);

}
