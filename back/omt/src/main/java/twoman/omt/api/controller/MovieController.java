package twoman.omt.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import twoman.omt.api.entity.dto.MovieDto;
import twoman.omt.api.entity.movie.Movie;
import twoman.omt.api.service.MovieService;
import twoman.omt.common.ApiResponse;

import javax.validation.Valid;
import java.util.List;

@RestController()
@RequestMapping("/api/v1/movies")
@RequiredArgsConstructor
public class MovieController {
    private final MovieService movieService;
    @PostMapping()
    public ApiResponse postMovie(@Valid @RequestBody MovieDto.PostMovieRequest postMovieRequest){
        User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Movie movie = new Movie(postMovieRequest.getTitle(), postMovieRequest.getPosterImageUrl(), postMovieRequest.getGenre());
        movieService.save(movie, principal.getUsername());
        return ApiResponse.success("save",null);
    }

    @DeleteMapping()
    public ApiResponse deleteMovie(@RequestParam Long movieId){
        User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        movieService.delete(movieId,  principal.getUsername());
        return ApiResponse.success("delete",null);
    }

    @PutMapping("/ticket")
    public ApiResponse putReview(@Valid @RequestBody MovieDto.PutMyTicketRequest request){
        User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        movieService.setTicketValues(principal.getUsername(), request);
        return ApiResponse.success("Set my Ticket Complete",null);
    }

    @GetMapping("/ticket")
    public ApiResponse getReview(@RequestParam Long movieId){
        User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        MovieDto.TicketResponse response = movieService.getTicketValues(principal.getUsername(), movieId);

        return ApiResponse.success("get review complete", response);
    }
}
