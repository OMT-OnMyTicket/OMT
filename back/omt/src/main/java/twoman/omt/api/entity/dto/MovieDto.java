package twoman.omt.api.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import twoman.omt.api.entity.movie.Movie;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

public class MovieDto {

    @Getter
    @AllArgsConstructor
    @Setter
    @NoArgsConstructor
    public static class PostMovieRequest {
        @Size(max = 64)
        @NotNull
        String title;
        @Size(max = 512)
        @NotNull
        String posterImageUrl;
        @NotNull
        @Size(max = 64)
        String genre;
    }

    @Getter
    @AllArgsConstructor
    @Setter
    @NoArgsConstructor
    public static class PutMyTicketRequest {
        @NotNull
        @Positive
        long id;
        @NotNull
        @Size(max = 512)
        String companion;
        @NotNull
        @Positive
        double grade;
        @NotNull
        @Size(max = 1024)
        String review;
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

    @Getter
    public static class TicketResponse{
        String companion;
        String review;
        double grade;

        public TicketResponse(Movie movie) {
            this.companion = movie.getCompanion();
            this.review = movie.getReview();
            this.grade = movie.getGrade();
        }
    }
}
