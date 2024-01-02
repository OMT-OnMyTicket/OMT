package twoman.omt.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import twoman.omt.api.entity.dto.MovieDto;
import twoman.omt.api.entity.movie.Movie;
import twoman.omt.api.service.MovieService;
import twoman.omt.common.ApiResponse;

@RestController()
@RequestMapping("/api/v1/movies")
@RequiredArgsConstructor
public class MovieController {
    private final MovieService movieService;
    @PostMapping()
    public ApiResponse postMovie(@RequestBody MovieDto.Request request){
        User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Movie movie = new Movie(request.getTitle(),request.getPosterImageUrl(),request.getGenre());
        movieService.save(movie, principal.getUsername());
        return ApiResponse.success("save",null);
    }

}
