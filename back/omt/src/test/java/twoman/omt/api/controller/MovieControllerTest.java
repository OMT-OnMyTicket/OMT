package twoman.omt.api.controller;

import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import twoman.omt.api.repository.user.UserRefreshTokenRepository;
import twoman.omt.api.service.MovieService;
import twoman.omt.api.service.TheaterService;
import twoman.omt.api.support.ControllerTest;
import twoman.omt.config.properties.AppProperties;
import twoman.omt.oauth.token.AuthTokenProvider;

import static org.junit.jupiter.api.Assertions.*;

@WebMvcTest(MovieController.class)
class MovieControllerTest extends ControllerTest {
    final String DEFAULT_URL = "/api/all/theaters";

    @MockBean
    MovieService movieService;

    @MockBean
    TheaterService theaterService;

    @MockBean
    AppProperties appProperties;

    @MockBean
    AuthTokenProvider authTokenProvider;

    @MockBean
    AuthenticationManager authenticationManager;

    @MockBean
    UserRefreshTokenRepository userRefreshTokenRepository;
}