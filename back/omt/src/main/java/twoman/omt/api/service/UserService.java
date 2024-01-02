package twoman.omt.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import twoman.omt.api.entity.dto.MovieDto;
import twoman.omt.api.entity.dto.UserDto;
import twoman.omt.api.entity.movie.Movie;
import twoman.omt.api.entity.user.User;
import twoman.omt.api.repository.user.UserRepository;
import twoman.omt.global.entity.BaseEntity;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;

    public UserDto.Response getUserResponse(String userIdentity){
        User findUser = userRepository.findByUserIdentity(userIdentity);

        return new UserDto.Response(findUser);
    }
    @Transactional
    public UserDto.Response updateUser(String userIdentity, UserDto.Update updateDto){
        User findUser = userRepository.findByUserIdentity(userIdentity);

        findUser.updateImage(updateDto.getProfileImageUrl());

        return new UserDto.Response(findUser);
    }

    @Transactional
    public UserDto.Response deleteImage(String userIdentity){
        User findUser = userRepository.findByUserIdentity(userIdentity);

        findUser.deleteImage();
        return new UserDto.Response(findUser);
    }

    public List<MovieDto.Response> GAMovies(String userIdentity) {
        User user = userRepository.findUserWithFetch(userIdentity);
        List<Movie> movies = user.getMovies();
        movies.sort(Comparator.comparing(BaseEntity::getCreatedDate).reversed());

        return movies.stream().map(MovieDto.Response::new).collect(Collectors.toList());
    }
}
