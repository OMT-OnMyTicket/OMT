package twoman.omt.api.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import twoman.omt.api.entity.Theater;
import twoman.omt.api.entity.movie.Cinema;
import twoman.omt.api.entity.movie.Movie;

public class MovieDto {

    @Getter
    @AllArgsConstructor
    @Setter
    @NoArgsConstructor
    public static class Request {
        String title;
        String posterImageUrl;
        String genre;
    }

    @Getter
    public static class Response{

        Long movieId;
        String title;
        String posterImageUrl;

        public Response(Movie movie) {
            this.movieId = movie.getId();
            this.title = movie.getTitle();
            this.posterImageUrl = movie.getPosterImageUrl();
        }
    }
}
