package twoman.omt.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import twoman.omt.api.entity.dto.MovieDto;
import twoman.omt.api.entity.movie.Movie;
import twoman.omt.api.entity.user.User;
import twoman.omt.api.repository.MovieRepository;
import twoman.omt.api.repository.user.UserRepository;
import twoman.omt.global.exception.BusinessLogicException;
import twoman.omt.global.exception.ExceptionCode;

import java.util.List;
import java.util.Objects;

@Transactional
@Service
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;
    private final UserRepository userRepository;

    public void save(Movie movie,String userIdentity){
        User findUser = userRepository.findByUserIdentity(userIdentity);
        movie.setUser(findUser);
        movieRepository.save(movie);
    }

    public void delete(Long movieId,String userIdentity) {
        User findUser = userRepository.findByUserIdentity(userIdentity);
        Movie findMovie = movieRepository.findById(movieId).orElseThrow(()->new BusinessLogicException(ExceptionCode.MOVIE_NOT_FOUND, "존재하지 않는 영화입니다."));
        if(!Objects.equals(findMovie.getUser(), findUser)){
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED, "해당 영화에 대한 권한이 없습니다.");
        }else{
            findMovie.deleteMovie(findUser);
            movieRepository.delete(findMovie);
        }
    }


    public void setTicketValues(String userIdentity ,MovieDto.PutMyTicketRequest request) {
        Movie findMovie = movieRepository.findById(request.getId()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MOVIE_NOT_FOUND, "존재하지 않는 영화입니다."));
        if(!Objects.equals(findMovie.getUser().getUserIdentity(), userIdentity)){
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED, "해당 영화에 대한 권한이 없습니다.");
        }else{
            findMovie.setTicketValues(request.getReview(), request.getGrade(), request.getCompanion());
        }
    }

    public MovieDto.TicketResponse getTicketValues(String userIdentity, Long movieId) {
        Movie findMovie = movieRepository.findById(movieId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MOVIE_NOT_FOUND, "존재하지 않는 영화입니다."));
        if(!Objects.equals(findMovie.getUser().getUserIdentity(), userIdentity)){
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED, "해당 영화에 대한 권한이 없습니다.");
        }else{
            return new MovieDto.TicketResponse(findMovie);
        }
    }
}
