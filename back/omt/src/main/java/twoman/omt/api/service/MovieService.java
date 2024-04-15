package twoman.omt.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import twoman.omt.api.entity.dto.MovieDto;
import twoman.omt.api.entity.movie.Movie;
import twoman.omt.api.entity.user.User;
import twoman.omt.api.repository.movie.MovieRepository;
import twoman.omt.api.repository.user.UserRepository;
import twoman.omt.global.exception.BusinessLogicException;
import twoman.omt.global.exception.ExceptionCode;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Transactional
@Service
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;
    private final UserRepository userRepository;

    public void save(Movie movie,String userIdentity){
        User findUser = userRepository.findByEmail(userIdentity).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        findUser.updateGrade();
        movie.setUser(findUser);
        movieRepository.save(movie);
    }

    public void delete(Long movieId,String userIdentity) {
        User findUser = userRepository.findByEmail(userIdentity).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        Movie findMovie = movieRepository.findById(movieId).orElseThrow(()->new BusinessLogicException(ExceptionCode.MOVIE_NOT_FOUND, "존재하지 않는 영화입니다."));
        if(!Objects.equals(findMovie.getUser(), findUser)){
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED, "해당 영화에 대한 권한이 없습니다.");
        }
        findMovie.deleteMovie(findUser);
        movieRepository.delete(findMovie);
    }


    public void setTicketValues(String userIdentity ,MovieDto.PutMyTicketRequest request) {
        Movie findMovie = movieRepository.findById(request.getId()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MOVIE_NOT_FOUND, "존재하지 않는 영화입니다."));
        if(!Objects.equals(findMovie.getUser().getNickName(), userIdentity)){
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED, "해당 영화에 대한 권한이 없습니다.");
        }
        findMovie.setTicketValues(request.getReview(), request.getGrade(), request.getCompanion());
    }

    @Transactional(readOnly = true)
    public MovieDto.TicketResponse getTicketValues(String userIdentity, Long movieId) {
        Movie findMovie = movieRepository.findById(movieId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MOVIE_NOT_FOUND, "존재하지 않는 영화입니다."));
        if(!Objects.equals(findMovie.getUser().getNickName(), userIdentity)){
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED, "해당 영화에 대한 권한이 없습니다.");
        }

        return new MovieDto.TicketResponse(findMovie);

    }

    @Transactional(readOnly = true)
    public List<MovieDto.ReviewResponse> getReviews(String movieTitle) {
        List<String> reviews = movieRepository.findMoviesWithTitle(movieTitle);
        List<MovieDto.ReviewResponse> response = new ArrayList<>();
        for (String review : reviews) {
            response.add(new MovieDto.ReviewResponse(review));
        }
        return response;
    }


    public void setLike(String userIdentity,Long movieId) {
        Movie findMovie = movieRepository.findById(movieId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MOVIE_NOT_FOUND, "존재하지 않는 영화입니다."));
        if(!Objects.equals(findMovie.getUser().getNickName(), userIdentity)){
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED, "해당 영화에 대한 권한이 없습니다.");
        }
        findMovie.setLikeTrue();
    }

    public List<MovieDto.CommonResponse> getMoviesWithLike(String userIdentity) {
        List<Movie> findMovies = movieRepository.findMoviesWithLike(userIdentity);
        List<MovieDto.CommonResponse> response = new ArrayList<>();
        for (Movie findMovie : findMovies) {
            response.add(new MovieDto.CommonResponse(findMovie));
        }
        return response;
    }
}
