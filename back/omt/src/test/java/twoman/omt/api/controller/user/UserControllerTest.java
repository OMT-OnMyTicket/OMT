package twoman.omt.api.controller.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.MockBeans;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import twoman.omt.api.annotations.WithMockUserCustom;
import twoman.omt.api.entity.dto.UserDto;
import twoman.omt.api.entity.user.User;
import twoman.omt.api.entity.user.UserRefreshToken;
import twoman.omt.api.repository.user.UserRefreshTokenRepository;
import twoman.omt.api.service.UserService;
import twoman.omt.api.support.ControllerTest;
import twoman.omt.config.properties.AppProperties;
import twoman.omt.oauth.handler.TokenAccessDeniedHandler;
import twoman.omt.oauth.service.CustomOAuth2UserService;
import twoman.omt.oauth.service.CustomUserDetailsService;
import twoman.omt.oauth.token.AuthToken;
import twoman.omt.oauth.token.AuthTokenProvider;

import java.util.Date;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static twoman.omt.config.properties.AppProperties.*;

@WebMvcTest(UserController.class)
class UserControllerTest extends ControllerTest {
    final String DEFAULT_URL = "/api/v1/users";

    @MockBean
    UserService userService;

    @MockBean
    AppProperties appProperties;

    @MockBean
    AuthTokenProvider authTokenProvider;

    @MockBean
    AuthenticationManager authenticationManager;

    @MockBean
    UserRefreshTokenRepository userRefreshTokenRepository;

    private User user;
    private UserDto.Response userDtoResponse;
    private Authentication authentication;
    private Auth auth;
    private AuthToken accessToken;
    private AuthToken refreshToken;
    private UserRefreshToken userRefreshToken;

    @BeforeEach
    void setup() throws Exception {
        Map<String, Object> userResource = userResource();

        user = (User) userResource.get("user");
        userDtoResponse = (UserDto.Response) userResource.get("userDtoResponse");
        authentication = (Authentication) userResource.get("authentication");
        auth = (Auth) userResource.get("auth");
        accessToken = (AuthToken) userResource.get("accessToken");
        refreshToken = (AuthToken) userResource.get("refreshToken");
        userRefreshToken = (UserRefreshToken) userResource.get("userRefreshToken");
    }

    @Test
    @DisplayName("[테스트] 유저 정보 조회")
    @WithMockUser
    void getTest() throws Exception {
        given(userService.getUserResponse(anyString()))
                .willReturn(userDtoResponse);


        getResource(DEFAULT_URL)
                .apply(true)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.body.response").isNotEmpty());
    }

    @Test
    @DisplayName("[테스트] 회원 정보 변경")
    @WithMockUser
    void updateTest() throws Exception {

        userDtoResponse.setImageUrl("wjudu");
        given(userService.updateUser(anyString(), any(UserDto.Update.class)))
                .willReturn(userDtoResponse);

        patchResource(DEFAULT_URL + "/image", new UserDto.Update("wjudu"))
                .apply(true)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.body.response").isNotEmpty());
    }

    @Test
    @DisplayName("[테스트] 회원 이미지 삭제")
    @WithMockUser
    void deleteTest() throws Exception {
        userDtoResponse.setImageUrl(null);
        given(userService.deleteImage(anyString()))
                .willReturn(userDtoResponse);

        deleteResource(DEFAULT_URL + "/image")
                .apply(true)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.body.response").isNotEmpty());
    }

}