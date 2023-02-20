package com.example.theatre.models;

import com.example.theatre.entity.PlayEntity;

public class PlaySeats {

    private PlayEntity play;
    private int takenSeats;

    public PlayEntity getPlay() {
        return play;
    }

    public void setPlay(PlayEntity play) {
        this.play = play;
    }

    public int getTakenSeats() {
        return takenSeats;
    }

    public void setTakenSeats(int takenSeats) {
        this.takenSeats = takenSeats;
    }
}
