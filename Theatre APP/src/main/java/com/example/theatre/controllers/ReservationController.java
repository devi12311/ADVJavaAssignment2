package com.example.theatre.controllers;

import com.example.theatre.entity.PlayEntity;
import com.example.theatre.entity.ReservationEntity;
import com.example.theatre.models.Reservation;
import com.example.theatre.repository.PlayHallRepository;
import com.example.theatre.repository.PlayRepository;
import com.example.theatre.repository.ReservationRepository;
import com.example.theatre.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin
public class ReservationController {

    private final ReservationRepository reservationRepository;
    private final PlayHallRepository playHallRepository;
    private final UserRepo userRepo;
    private final PlayRepository playRepository;

    @Autowired
    public ReservationController(ReservationRepository reservationRepository, PlayHallRepository playHallRepository, UserRepo userRepo,
                                 PlayRepository playRepository) {
        this.reservationRepository = reservationRepository;
        this.playHallRepository = playHallRepository;
        this.userRepo = userRepo;
        this.playRepository = playRepository;
    }

    @PostMapping("/create")
    public ReservationEntity reserveSeat(@RequestBody Reservation reservation) {
        ReservationEntity reservationEntity = new ReservationEntity();
        Long playHallId = playHallRepository.getPlayHallEntityByHallIdAndPlayId(reservation.getHallId(), reservation.getPlayId()).getId();
        reservationEntity.setUserId(userRepo.findByEmail(reservation.getEmail()).get().getId());
        reservationEntity.setPlayHallId(playHallId);
        return reservationRepository.save(reservationEntity);
    }

    @GetMapping("/list")
    public List<PlayEntity> pastReservations() {
            List<ReservationEntity> entity = reservationRepository.getAllByUserId(userRepo.findByEmail(SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getPrincipal()
                    .toString())
                .get()
                .getId());
            List<PlayEntity> playEntities = new ArrayList<>();

            entity.forEach(reservation ->{
                playEntities.add(playRepository.findById(playHallRepository.findById(reservation.getPlayHallId()).get().getPlayId()).get());
            });
            return playEntities;
    }

}
