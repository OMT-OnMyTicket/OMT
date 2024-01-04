package twoman.omt.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import twoman.omt.api.entity.dto.MovieDto;
import twoman.omt.api.entity.movie.Movie;
import twoman.omt.api.service.MovieService;
import twoman.omt.common.ApiResponse;

import java.util.List;

@RestController()
@RequestMapping("/api/v1/movies")
@RequiredArgsConstructor
public class MovieController {
    private final MovieService movieService;
    @PostMapping()
    public ApiResponse postMovie(@RequestBody MovieDto.PostRequest postRequest){
        User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Movie movie = new Movie(postRequest.getTitle(), postRequest.getPosterImageUrl(), postRequest.getGenre());
        movieService.save(movie, principal.getUsername());
        return ApiResponse.success("save",null);
    }

    @DeleteMapping()
    public ApiResponse deleteMovie(@RequestParam Long movieId){
        User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        movieService.delete(movieId,  principal.getUsername());
        return ApiResponse.success("delete",null);
    }

    @PutMapping()
    public ApiResponse putRank(@RequestBody List<MovieDto.PutRequest> request){
        User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        movieService.setRank(request);

        return ApiResponse.success("Ranking completed",null);
    }
}
