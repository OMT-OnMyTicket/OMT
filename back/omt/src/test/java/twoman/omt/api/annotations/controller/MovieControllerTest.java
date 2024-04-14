//package twoman.omt.api.controller;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import twoman.omt.api.entity.dto.MovieDto;
//import twoman.omt.api.entity.movie.Movie;
//import twoman.omt.api.entity.user.User;
//import twoman.omt.api.repository.RefreshTokenRepository;
//import twoman.omt.api.service.MovieService;
//import twoman.omt.api.service.TheaterService;
//import twoman.omt.api.support.ControllerTest;
//import twoman.omt.config.properties.AppProperties;
//import twoman.omt.oauth.token.AuthTokenProvider;
//
//import java.util.Map;
//
//import static org.mockito.BDDMockito.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@WebMvcTest(MovieController.class)
//class MovieControllerTest extends ControllerTest {
//    final String DEFAULT_URL = "/api/v1/movies";
//
//    @MockBean
//    MovieService movieService;
//
//    @MockBean
//    TheaterService theaterService;
//
//    @MockBean
//    AppProperties appProperties;
//
//    @MockBean
//    AuthTokenProvider authTokenProvider;
//
//    @MockBean
//    AuthenticationManager authenticationManager;
//
//    @MockBean
//    RefreshTokenRepository refreshTokenRepository;
//
//    @MockBean
//    PasswordEncoder passwordEncoder;
//
//    private User user;
//    private Movie movie;
//    private MovieDto.PostMovieRequest postDto;
//
//    private MultiValueMap<String,String> params;
//    @BeforeEach
//    void setup() throws Exception {
//        Map<String, Object> userResource = userResource();
//        user = (User)userResource.get("user");
//        movie = new Movie("파묘", "qwidjiqwdjk2211@", "오컬트");
//        postDto = new MovieDto.PostMovieRequest("파묘", "qwidjiqwdjk2211@", "오컬트");
//        params = new LinkedMultiValueMap<>();
//    }
//    @Test
//    @DisplayName("[테스트] 영화 등록 테스트")
//    @WithMockUser
//    void postMovieTest() throws Exception {
//
//        doNothing().when(movieService).save(any(Movie.class), anyString());
//
//        postResource(DEFAULT_URL,postDto)
//                .apply(true)
//                .andExpect(status().isCreated());
//    }
//
//    @Test
//    @DisplayName("[테스트] 영화 삭제 테스트")
//    @WithMockUser
//    void deleteMovieTest() throws Exception {
//        doNothing().when(movieService).delete(anyLong(), anyString());
//        params.add("movieId", "1");
//
//        deleteResource(DEFAULT_URL,params)
//                .apply(true)
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.body.delete").isEmpty());
//    }
//}