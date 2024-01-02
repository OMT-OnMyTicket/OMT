package twoman.omt.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import twoman.omt.api.entity.movie.Movie;

public interface MovieRepository extends JpaRepository<Movie,Long> {

}
