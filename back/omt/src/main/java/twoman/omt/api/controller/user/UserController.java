package twoman.omt.api.controller.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import twoman.omt.api.entity.dto.MovieDto;
import twoman.omt.api.entity.dto.UserDto;

import twoman.omt.api.service.UserService;
import twoman.omt.common.ApiResponse;
import twoman.omt.config.properties.AppProperties;
import twoman.omt.oauth.token.AuthTokenProvider;

import java.util.List;


@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;


    @GetMapping
    public ApiResponse getUser() {
        User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        UserDto.Response response = userService.getUserResponse(principal.getUsername());

        return ApiResponse.success("response", response);
    }
    @GetMapping("/movies")
    public ApiResponse getUserMovies() {
        User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        List<MovieDto.Response> response = userService.GAMovies(principal.getUsername());
        if(response.size() ==0) return ApiResponse.success("response", null);
        return ApiResponse.success("response", response);
    }

    @GetMapping("/movies/top4")
    public ApiResponse getTop4Movies() {
        User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        List<MovieDto.Response> response = userService.getTop4Movies(principal.getUsername());
        if(response.size() ==0) return ApiResponse.success("response", null);
        return ApiResponse.success("response", response);
    }

    @PatchMapping("/image")
    public ApiResponse updateUser(@RequestBody UserDto.Update updateDto){
        User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserDto.Response response = userService.updateUser(principal.getUsername(), updateDto);

        return ApiResponse.success("response", response);
    }

    @DeleteMapping("/image")
    public ApiResponse deleteImage() {
        User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserDto.Response response = userService.deleteImage(principal.getUsername());

        return ApiResponse.success("response", response);
    }


}
