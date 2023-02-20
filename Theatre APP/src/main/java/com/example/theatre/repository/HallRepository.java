package com.example.theatre.repository;

import com.example.theatre.entity.HallEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HallRepository extends JpaRepository<HallEntity, Long> {

    HallEntity getHallEntityById(Long id);

}
