package twoman.omt.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import twoman.omt.api.entity.dto.MovieDto;
import twoman.omt.api.entity.movie.Movie;
import twoman.omt.api.entity.user.User;
import twoman.omt.api.repository.MovieRepository;
import twoman.omt.api.repository.user.UserRepository;

@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;
    private final UserRepository userRepository;

    @Transactional
    public void save(Movie movie,String userIdentity){
        User findUser = userRepository.findByUserIdentity(userIdentity);
        movie.setUser(findUser);
        movieRepository.save(movie);
    }

}
