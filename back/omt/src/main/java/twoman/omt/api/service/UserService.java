package twoman.omt.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import twoman.omt.api.entity.dto.MovieDto;
import twoman.omt.api.entity.dto.UserDto;
import twoman.omt.api.entity.movie.Movie;
import twoman.omt.api.entity.user.User;
import twoman.omt.api.repository.user.UserRepository;
import twoman.omt.global.entity.BaseEntity;
import twoman.omt.global.exception.BusinessLogicException;
import twoman.omt.global.exception.ExceptionCode;

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
        User findUser = userRepository.findByEmail(userIdentity).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        return new UserDto.Response(findUser);
    }
    @Transactional
    public UserDto.Response updateUser(String userIdentity, UserDto.Update updateDto){
        User findUser = userRepository.findByEmail(userIdentity).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        findUser.updateImage(updateDto.getProfileImageUrl());

        return new UserDto.Response(findUser);
    }

    @Transactional
    public UserDto.Response deleteImage(String userIdentity){
        User findUser = userRepository.findByEmail(userIdentity).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        findUser.deleteImage();
        return new UserDto.Response(findUser);
    }

    public List<MovieDto.CommonResponse> GAMovies(String userIdentity) {
        User user = userRepository.findUserWithFetch(userIdentity);
        if(user != null && user.getMovies() != null && !user.getMovies().isEmpty()) {
            List<Movie> movies = user.getMovies();
            movies.sort(Comparator.comparing(BaseEntity::getCreatedDate).reversed());

            return movies.stream().map(MovieDto.CommonResponse::new).collect(Collectors.toList());
        }
        else return Collections.emptyList();
    }

    public List<MovieDto.CommonResponse> getTop4Movies(String userIdentity) {
        User user = userRepository.findUserTop4Fetch(userIdentity);

        if(user != null && user.getMovies() != null && !user.getMovies().isEmpty()) {
            List<Movie> movies = user.getMovies();
            return movies.stream().map(MovieDto.CommonResponse::new).collect(Collectors.toList());
        }
        else return Collections.emptyList();
    }

    public User findById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }

    @Transactional
    public Long save(UserDto.AddUserRequest dto){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        return userRepository.save(User.builder()
                .email(dto.getEmail())
                .password(encoder.encode(dto.getPassword()))
                .build()).getUserSeq();
    }

    public User findByEmail(String email){
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }
}
