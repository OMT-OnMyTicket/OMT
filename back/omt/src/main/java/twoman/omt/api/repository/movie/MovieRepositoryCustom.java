package twoman.omt.api.repository.movie;

import twoman.omt.api.entity.movie.Movie;

import java.util.List;

public interface MovieRepositoryCustom {
    List<String> findMoviesWithTitle(String title);

    List<Movie> findMoviesWithLike(String userIdentity);
}
