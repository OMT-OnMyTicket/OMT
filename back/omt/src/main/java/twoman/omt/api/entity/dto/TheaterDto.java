package twoman.omt.api.entity.dto;

import lombok.Getter;
import twoman.omt.api.entity.movie.Cinema;
import twoman.omt.api.entity.Theater;

public class TheaterDto {

    @Getter
    public static class Response {
        Cinema cinema;
        String cinemaName;
        String region;

        public Response(Theater theater) {
            this.cinema = theater.getCinema();
            this.cinemaName = theater.getCinemaName();
            this.region = theater.getRegion();
        }
    }


}
