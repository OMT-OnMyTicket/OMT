package twoman.omt.api.repository.movie;

import org.springframework.data.jpa.repository.JpaRepository;
import twoman.omt.api.entity.movie.Movie;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie,Long>, MovieRepositoryCustom {

}
