package com.example.theatre.entity;

import javax.persistence.*;

@Entity
@Table(name = "reservations")
public class ReservationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "user_id")
    private Long userId;
    @Column(name = "playhall_id")
    private Long playHallId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getPlayHallId() {
        return playHallId;
    }

    public void setPlayHallId(Long playHallId) {
        this.playHallId = playHallId;
    }
}
