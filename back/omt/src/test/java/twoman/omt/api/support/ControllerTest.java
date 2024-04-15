//package twoman.omt.api.support;
//
//import com.google.gson.Gson;
//import io.jsonwebtoken.security.Keys;
//import org.apache.commons.lang3.reflect.FieldUtils;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.Spy;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.autoconfigure.aop.AopAutoConfiguration;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.boot.test.mock.mockito.MockBeans;
//import org.springframework.context.annotation.Import;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.restdocs.RestDocumentationContextProvider;
//import org.springframework.restdocs.RestDocumentationExtension;
//import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
//import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
//import org.springframework.restdocs.mockmvc.RestDocumentationResultHandler;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
//import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.context.WebApplicationContext;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import org.springframework.web.filter.CharacterEncodingFilter;
//import twoman.omt.api.config.RestDocsConfig;
//import twoman.omt.api.entity.dto.MovieDto;
//import twoman.omt.api.entity.dto.UserDto;
//import twoman.omt.api.entity.movie.Movie;
//import twoman.omt.api.entity.user.Grade;
//import twoman.omt.api.entity.user.User;
//import twoman.omt.global.entity.BaseEntity;
//import twoman.omt.global.exception.BusinessLogicException;
//import twoman.omt.global.exception.ExceptionCode;
//import twoman.omt.oauth.entity.ProviderType;
//import twoman.omt.oauth.entity.RoleType;
//import twoman.omt.oauth.entity.UserPrincipal;
//import twoman.omt.oauth.handler.TokenAccessDeniedHandler;
//import twoman.omt.oauth.service.OAuth2UserCustomService;
//import twoman.omt.oauth.service.CustomUserDetailsService;
//import twoman.omt.oauth.token.AuthToken;
//import twoman.omt.oauth.token.AuthTokenProvider;
//
//import javax.servlet.http.Cookie;
//import java.time.LocalDateTime;
//import java.util.*;
//import java.util.stream.Collectors;
//
//import static twoman.omt.config.properties.AppProperties.*;
//
//@Import({RestDocsConfig.class, AopAutoConfiguration.class})
//@ExtendWith({RestDocumentationExtension.class, SpringExtension.class})
//@MockBeans({
//        @MockBean(JpaMetamodelMappingContext.class),
//        @MockBean(OAuth2UserCustomService.class),
//        @MockBean(CustomUserDetailsService.class),
//        @MockBean(TokenAccessDeniedHandler.class),
//        @MockBean(UrlBasedCorsConfigurationSource.class),
//})
//public abstract class ControllerTest {
//    // Base64 SecretKey inject, Testing only
//    private final String TEST_SECRET_TOKEN = "d297f22853e39936052a15a41266866bf058923f";
//
//    @Autowired
//    protected MockMvc mockMvc;
//
//    @Autowired
//    protected Gson gson;
//
//    @Autowired
//    protected RestDocumentationResultHandler restDocs;
//
//    @Spy
//    protected AuthTokenProvider authTokenProvider;
//
//    @BeforeEach
//    void setUp(final WebApplicationContext ctx, final RestDocumentationContextProvider provider) {
//        this.mockMvc = MockMvcBuilders.webAppContextSetup(ctx)
//                .apply(MockMvcRestDocumentation.documentationConfiguration(provider))
//                .alwaysDo(MockMvcResultHandlers.print())
//                .alwaysDo(restDocs)
//                .addFilters(new CharacterEncodingFilter("UTF-8", true))
//                .build();
//    }
//
//    protected Map<String, Object> userResource() throws Exception {
//        Map<String, Object> resource = new HashMap<>();
//
//        User user = new User(
//                1L,
//                "TEST",
//                "TEST",
//                "NO_PASS",
//                "wuduqj11@naver.com",
//                "Y",
//                "uwuduq221",
//                ProviderType.GOOGLE,
//                RoleType.USER,
//                Grade.BRONZE,
//                new ArrayList<>()
//                );
//
//        UserDto.Response userDtoResponse = new UserDto.Response(user);
//
//        UsernamePasswordAuthenticationToken authentication =
//                new UsernamePasswordAuthenticationToken(
//                        new UserPrincipal(
//                                user,
//                                Collections.singletonList(new SimpleGrantedAuthority(RoleType.USER.getCode()))
//                        ),
//                        "NO_PASS"
//                );
//
//        Auth auth = new Auth(TEST_SECRET_TOKEN, 1000 * 60, 1000 * 60);
//        AuthToken accessToken = genJwtToken("access");
//        AuthToken refreshToken = genJwtToken("refresh");
//
//        RefreshToken userRefreshToken = new RefreshToken(user.getNickName(), Objects.requireNonNull(refreshToken).getToken());
//
//        List<Movie> movies = new ArrayList<>();
//        Movie movie1 = new Movie("서울의 봄", "absd@@1", "드라마");
//        Movie movie2 = new Movie("타잔", "absd@@1", "액션");
//        Movie movie3 = new Movie("내부자들", "absd@@1", "드라마");
//        Movie movie4 = new Movie("스파이더맨", "absd@@1", "액션");
//        movie1.setCreatedDate(LocalDateTime.now());
//        movie1.setLastModifiedDate(LocalDateTime.now());
//        movie2.setCreatedDate(LocalDateTime.now());
//        movie2.setLastModifiedDate(LocalDateTime.now());
//        movie3.setCreatedDate(LocalDateTime.now());
//        movie3.setLastModifiedDate(LocalDateTime.now());
//        movie4.setCreatedDate(LocalDateTime.now());
//        movie4.setLastModifiedDate(LocalDateTime.now());
//        movies.add(movie1);
//        movies.add(movie2);
//        movies.add(movie3);
//        movies.add(movie4);
//
//
//        movies.sort(Comparator.comparing(BaseEntity::getCreatedDate).reversed());
//
//        List<MovieDto.CommonResponse> moviesAllCommonResponse = movies.stream().map(MovieDto.CommonResponse::new).collect(Collectors.toList());
//
//        resource.put("user", user);
//        resource.put("userDtoResponse", userDtoResponse);
//        resource.put("authentication", authentication);
//        resource.put("auth", auth);
//        resource.put("accessToken", accessToken);
//        resource.put("refreshToken", refreshToken);
//        resource.put("userRefreshToken", userRefreshToken);
//        resource.put("moviesAllResponse", moviesAllCommonResponse);
//
//        return resource;
//    }
//
//    private AuthToken genJwtToken(String type) throws Exception {
//        long expiry = new Date().getTime();
//
//        FieldUtils.writeField(authTokenProvider, "secretKey", TEST_SECRET_TOKEN, true);
//        FieldUtils.writeField(authTokenProvider, "key", Keys.hmacShaKeyFor(TEST_SECRET_TOKEN.getBytes()), true);
//
//        AuthToken accessToken =
//                authTokenProvider
//                        .createAuthToken("TEST", RoleType.USER.getCode(), new Date(expiry));
//        AuthToken refreshToken =
//                authTokenProvider
//                        .createAuthToken("TEST", new Date(expiry));
//
//        switch (type) {
//            case "access":
//                return accessToken;
//            case "refresh":
//                return refreshToken;
//            default:
//                return null;
//        }
//    }
//    private void genHeader(MockHttpServletRequestBuilder requestBuilder) throws Exception {
//        String accessToken = Objects.requireNonNull(genJwtToken("access")).getToken();
//        String refreshToken = Objects.requireNonNull(genJwtToken("refresh")).getToken();
//
//        requestBuilder.header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);
//        requestBuilder.cookie(new Cookie("refresh_token", refreshToken));
//    }
//
//
//    /*
//     * # Post Resources
//     *
//     */
//    protected <T> ResultActionsWithUserFunction<Boolean, ResultActions> postResource(
//            String url,
//            T body,
//            Object... pathVariables
//    ) {
//        return postResources(url, body, null, pathVariables);
//    }
//
//    protected ResultActionsWithUserFunction<Boolean, ResultActions> postResource(
//            String url,
//            MultiValueMap<String, String> parameters,
//            Object... pathVariables
//    ) {
//        return postResources(url, null, parameters, pathVariables);
//    }
//
//    protected <T> ResultActionsWithUserFunction<Boolean, ResultActions> postResources(
//            String url,
//            T body,
//            MultiValueMap<String, String> parameters,
//            Object... pathVariables
//    ) {
//        return withUser -> {
//            try {
//                MockHttpServletRequestBuilder requestBuilder =
//                        RestDocumentationRequestBuilders.post(url, pathVariables)
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .accept(MediaType.APPLICATION_JSON);
//
//                if (parameters != null) requestBuilder.params(parameters);
//
//                if (body != null) requestBuilder.content(gson.toJson(body));
//
//                if (withUser) genHeader(requestBuilder);
//
//                return mockMvc.perform(requestBuilder);
//            } catch (Exception e) {
//                throw new BusinessLogicException(ExceptionCode.INTERNAL_SERVER_ERROR);
//            }
//        };
//    }
//    /*
//     * # Get Resources
//     *
//     */
//    protected ResultActionsWithUserFunction<Boolean, ResultActions> getResource(
//            String url,
//            Object... pathVariables
//    ) {
//        return getResources(url, null, pathVariables);
//    }
//
//    protected ResultActionsWithUserFunction<Boolean, ResultActions> getResource(
//            String url,
//            MultiValueMap<String, String> parameters,
//            Object... pathVariables
//    ) {
//        return getResources(url, parameters, pathVariables);
//    }
//
//    protected ResultActionsWithUserFunction<Boolean, ResultActions> getResources(
//            String url,
//            MultiValueMap<String, String> parameters,
//            Object... pathVariables
//    ) {
//        return withUser -> {
//            try {
//                MockHttpServletRequestBuilder requestBuilder =
//                        RestDocumentationRequestBuilders.get(url, pathVariables)
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .accept(MediaType.APPLICATION_JSON);
//
//                if (parameters != null) requestBuilder.params(parameters);
//
//                if (withUser) genHeader(requestBuilder);
//
//                return mockMvc.perform(requestBuilder);
//            } catch (Exception e) {
//                throw new BusinessLogicException(ExceptionCode.INTERNAL_SERVER_ERROR);
//            }
//        };
//    }
//
//    /*
//     * # Patch Resources
//     *
//     */
//    protected <T> ResultActionsWithUserFunction<Boolean, ResultActions> patchResource(
//            String url,
//            T body,
//            Object... pathVariables
//    ) {
//        if (body != null) return patchResources(url, body, pathVariables);
//
//        return patchResources(url, null, pathVariables);
//    }
//
//    protected <T> ResultActionsWithUserFunction<Boolean, ResultActions> patchResources(
//            String url,
//            T body,
//            Object... pathVariables
//    ) {
//        return withUser -> {
//            try {
//                MockHttpServletRequestBuilder requestBuilder =
//                        RestDocumentationRequestBuilders.patch(url, pathVariables)
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .accept(MediaType.APPLICATION_JSON);
//
//                if (body != null) requestBuilder.content(gson.toJson(body));
//
//                if (withUser) genHeader(requestBuilder);
//
//                return mockMvc.perform(requestBuilder);
//
//            } catch (Exception e) {
//                throw new BusinessLogicException(ExceptionCode.INTERNAL_SERVER_ERROR);
//            }
//        };
//    }
//
//    /*
//     * # Delete Resources
//     *
//     */
//    protected <T> ResultActionsWithUserFunction<Boolean, ResultActions> deleteResource(
//            String url) {
//        return deleteResources(url, null, (Object) null);
//    }
//
//    protected <T> ResultActionsWithUserFunction<Boolean, ResultActions> deleteResource(
//            String url,
//            MultiValueMap<String, String> parameters,
//            Object... pathVariables
//    ) {
//        return deleteResources(url, parameters, pathVariables);
//    }
//
//    protected ResultActionsWithUserFunction<Boolean, ResultActions> deleteResources(
//            String url,
//            MultiValueMap<String, String> parameters,
//            Object... pathVariables
//    ) {
//        return withUser -> {
//            try {
//                MockHttpServletRequestBuilder requestBuilder =
//                        RestDocumentationRequestBuilders.delete(url, pathVariables)
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .accept(MediaType.APPLICATION_JSON);
//
//                if (parameters != null) requestBuilder.params(parameters);
//
//                if (withUser) genHeader(requestBuilder);
//
//                return mockMvc.perform(requestBuilder);
//            } catch (Exception e) {
//                throw new BusinessLogicException(ExceptionCode.INTERNAL_SERVER_ERROR);
//            }
//        };
//    }
//
//}
