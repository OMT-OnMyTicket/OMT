//package twoman.omt.api.controller;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import twoman.omt.api.entity.movie.Cinema;
//import twoman.omt.api.entity.Theater;
//import twoman.omt.api.entity.dto.TheaterDto;
//import twoman.omt.api.repository.RefreshTokenRepository;
//import twoman.omt.api.service.TheaterService;
//import twoman.omt.api.support.ControllerTest;
//import twoman.omt.config.properties.AppProperties;
//import twoman.omt.oauth.token.AuthTokenProvider;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.mockito.BDDMockito.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//@WebMvcTest(TheaterController.class)
//class TheaterControllerTest extends ControllerTest{
//    final String DEFAULT_URL = "/api/all/theaters";
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
//
//    private List<TheaterDto.Response> responses;
//
//    private Theater theater1;
//    private Theater theater2;
//    private Theater theater3;
//    private TheaterDto.Response responseDto1;
//    private TheaterDto.Response responseDto2;
//    private TheaterDto.Response responseDto3;
//    private MultiValueMap<String,String> params;
//
//    @BeforeEach
//    void setup() throws Exception {
//        responses = new ArrayList<>();
//        theater1 = Theater.builder().region("경기").cinema(Cinema.CGV).cinemaName("CGV 여의도").build();
//        theater2 = Theater.builder().region("서울").cinema(Cinema.LOTTE).cinemaName("LOTTE 건대입구점").build();
//        theater3 = Theater.builder().region("서울").cinema(Cinema.MEGABOX).cinemaName("MEGA 코엑스점").build();
//
//        responseDto1 =  new TheaterDto.Response(theater1);
//        responseDto2 =  new TheaterDto.Response(theater2);
//        responseDto3 =  new TheaterDto.Response(theater3);
//        params = new LinkedMultiValueMap<>();
//    }
//
//    @Test
//    @DisplayName("[테스트] 지역별 영화관 호출")
//    void getWithRegionTest() throws Exception {
//         given(theaterService.findTheaters(anyString()))
//                 .willReturn(responses);
//         responses.add(responseDto1);
//
//         params.add("region", "경기");
//         getResource(DEFAULT_URL + "/region", params)
//                 .apply(false)
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$.body.theaters").isNotEmpty())
//                 .andExpect(jsonPath("$.body.theaters").isArray());
//
//         responses = new ArrayList<>();
//
//         given(theaterService.findTheaters(anyString()))
//                .willReturn(responses);
//
//         params = new LinkedMultiValueMap<>();
//         params.add("region", "제주");
//
//         getResource(DEFAULT_URL + "/region", params)
//                .apply(false)
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.body.theaters").isEmpty())
//                .andExpect(jsonPath("$.body.theaters").isArray());
//
//    }
//
//    @Test
//    @DisplayName("[테스트] 지역별 특정 영화관 호출")
//    void getWithRegionAndCinemaTest() throws Exception {
//        given(theaterService.findTheaters(anyString(),anyString()))
//                .willReturn(responses);
//
//        responses.add(responseDto2);
//
//        params.add("region", "서울");
//        params.add("cinema", "LOTTE");
//
//        getResource(DEFAULT_URL + "/region/cinema", params)
//                .apply(false)
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.body.theaters").isNotEmpty())
//                .andExpect(jsonPath("$.body.theaters").isArray());
//    }
//
//}