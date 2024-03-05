package twoman.omt.api.controller.auth;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import twoman.omt.api.entity.auth.AuthReqModel;
import twoman.omt.api.entity.user.User;
import twoman.omt.api.entity.user.UserRefreshToken;
import twoman.omt.api.repository.UserRefreshTokenRepository;
import twoman.omt.api.repository.user.UserRepository;
import twoman.omt.api.service.UserRefreshTokenService;
import twoman.omt.api.support.ControllerTest;
import twoman.omt.config.properties.AppProperties;
import twoman.omt.oauth.token.AuthToken;
import twoman.omt.oauth.token.AuthTokenProvider;

import java.util.Date;
import java.util.Map;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static twoman.omt.config.properties.AppProperties.*;

@WebMvcTest(controllers = AuthController.class)
class AuthControllerTest extends ControllerTest {
    final String DEFAULT_URL = "/api/all/v1/auth";
    @MockBean
    AppProperties appProperties;

    @MockBean
    AuthTokenProvider authTokenProvider;

    @MockBean
    AuthenticationManager authenticationManager;

    @MockBean
    UserRefreshTokenRepository userRefreshTokenRepository;

    @MockBean
    UserRefreshTokenService userRefreshTokenService;

    @MockBean
    UserRepository userRepository;

    @MockBean
    PasswordEncoder passwordEncoder;


    private User user;
    private Authentication authentication;
    private Auth auth;
    private AuthToken accessToken;
    private AuthToken refreshToken;
    private UserRefreshToken userRefreshToken;



    @BeforeEach
    void setup() throws Exception {
        Map<String, Object> userResource = userResource();

        user = (User) userResource.get("user");
        authentication = (Authentication) userResource.get("authentication");
        auth = (Auth) userResource.get("auth");
        accessToken = (AuthToken) userResource.get("accessToken");
        refreshToken = (AuthToken) userResource.get("refreshToken");
        userRefreshToken = (UserRefreshToken) userResource.get("userRefreshToken");
    }

    @Test
    @DisplayName("[테스트] OAuth2 로그인")
    void signupTest() throws Exception {
        given(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .willReturn(authentication);

        given(authTokenProvider.createAuthToken(anyString(), anyString(), any(Date.class)))
                .willReturn(accessToken);

        given(appProperties.getAuth())
                .willReturn(auth);

        given(authTokenProvider.createAuthToken(anyString(), any(Date.class)))
                .willReturn(refreshToken);

        given(userRefreshTokenRepository.findByUserIdentity(anyString()))
                .willReturn(userRefreshToken);

        given(userRefreshTokenRepository.saveAndFlush(any(UserRefreshToken.class)))
                .willReturn(userRefreshToken);

        postResource(DEFAULT_URL + "/login",
                new AuthReqModel(
                        user.getUserIdentity(),
                        user.getPassword()
                )
        )
                .apply(false)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.body.token").isNotEmpty());
    }

    @Test
    @DisplayName("[테스트] Refresh Token 재발급")
    @WithMockUser
    void refreshTest() throws Exception {
        given(authTokenProvider.convertAuthToken(anyString()))
                .willReturn(accessToken);

        given(userRefreshTokenRepository.findByUserIdentityAndRefreshToken(anyString(), anyString()))
                .willReturn(userRefreshToken);

        given(appProperties.getAuth())
                .willReturn(auth);

        given(authTokenProvider.createAuthToken(anyString(), anyString(), any(Date.class)))
                .willReturn(accessToken);

        given(authTokenProvider.createAuthToken(anyString(), any(Date.class)))
                .willReturn(refreshToken);


        getResource(DEFAULT_URL + "/refresh")
                .apply(true)
                .andExpect(status().isOk());
    }
}