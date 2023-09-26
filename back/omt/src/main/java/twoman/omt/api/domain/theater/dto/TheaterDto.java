package twoman.omt.api.domain.theater.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

public class TheaterDto {

    @Getter
    @AllArgsConstructor
    public static class Response {
        String cinema;
        String cinemaName;
        String region;
    }


}
