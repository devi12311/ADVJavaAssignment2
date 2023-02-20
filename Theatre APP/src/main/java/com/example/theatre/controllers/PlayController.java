package com.example.theatre.controllers;

import com.example.theatre.entity.PlayEntity;
import com.example.theatre.entity.PlayHallEntity;
import com.example.theatre.models.PlaySeats;
import com.example.theatre.repository.PlayHallRepository;
import com.example.theatre.repository.PlayRepository;
import com.example.theatre.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/play")
@CrossOrigin
public class PlayController {

    private final PlayRepository playRepository;
    private final PlayHallRepository playHallRepository;
    private final ReservationRepository reservationRepository;

    @Autowired
    public PlayController(PlayRepository playRepository, PlayHallRepository playHallRepository, ReservationRepository reservationRepository) {
        this.playRepository = playRepository;
        this.playHallRepository = playHallRepository;
        this.reservationRepository = reservationRepository;
    }

    @GetMapping("/list")
    public List<PlayEntity> getAllPlays(){
        return playRepository.findAll();
    }

    @GetMapping("/date/{date}")
    public List<PlayEntity> getAllEntitiesPerDate(@PathVariable Instant date){
        return playRepository.getPlayEntitiesByStartDate(date);
    }

    @GetMapping("/{playId}")
    public List<PlaySeats> getPlay(@PathVariable Long playId){
        List<PlayHallEntity> playHalls = playHallRepository.getPlayHallEntitiesByPlayId(playId);
        List<PlaySeats> playSeats = new ArrayList<>();
        playHalls.forEach(playHallEntity -> {
            PlaySeats playSeat = new PlaySeats();
            playSeat.setPlay(playRepository.findById(playId).get());
            playSeat.setTakenSeats(reservationRepository.countAllByPlayHallId(playHallEntity.getId()));
            playSeats.add(playSeat);
        });
        return playSeats;
    }
}
