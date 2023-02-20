package com.example.theatre.controllers;

import com.example.theatre.entity.HallEntity;
import com.example.theatre.entity.PlayHallEntity;
import com.example.theatre.repository.HallRepository;
import com.example.theatre.repository.PlayHallRepository;
import com.example.theatre.repository.PlayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/hall")
public class HallController {

    private final HallRepository hallRepository;
    private final PlayHallRepository playHallRepository;
    private final PlayRepository playRepository;

    @Autowired

    public HallController(HallRepository hallRepository, PlayHallRepository playHallRepository, PlayRepository playRepository) {
        this.hallRepository = hallRepository;
        this.playHallRepository = playHallRepository;
        this.playRepository = playRepository;
    }

    @GetMapping("/list")
    public List<HallEntity> getAllHalls(){
        return hallRepository.findAll();
    }


    @GetMapping("/playId/{playId}")
    public List<HallEntity> getAllHallsPerPlay(@PathVariable Long playId){
        List<PlayHallEntity> playHalls = playHallRepository.getPlayHallEntitiesByPlayId(playId);
        List<HallEntity> halls = new ArrayList<>();
        playHalls.forEach(playHall -> {
            halls.add(hallRepository.findById(playHall.getHallId()).get());
        });
        return halls;
    }


}
