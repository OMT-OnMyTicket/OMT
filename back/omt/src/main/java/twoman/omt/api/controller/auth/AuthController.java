package twoman.omt.api.controller.auth;

//
//@Slf4j
//@RestController
//@RequestMapping("/api/all/v1/auth")
//@RequiredArgsConstructor
//public class AuthController {

//    private final AppProperties appProperties;
//    private final AuthTokenProvider tokenProvider;
//    private final AuthenticationManager authenticationManager;
//
//    private final TokenService tokenService;
//
//    private final static long THREE_DAYS_MSEC = 259200000;
//    private final static String REFRESH_TOKEN = "refresh_token";

//    @PostMapping("/login")
//    public ApiResponse login(
//            HttpServletRequest request,
//            HttpServletResponse response,
//            @Valid @RequestBody AuthReqModel authReqModel
//    ) {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        authReqModel.getIdentity(),
//                        authReqModel.getPassword()
//                )
//        );
//
//        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
//        User user = userPrincipal.getUser();
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        String id = user.getNickName();
//        Date now = new Date();
//        AuthToken accessToken = tokenProvider.createAuthToken(
//                id,
//                ((UserPrincipal) authentication.getPrincipal()).getUser().getRoleType().getCode(),
//                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
//        );
//
//        long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();
//        AuthToken refreshToken = tokenProvider.createAuthToken(
//                appProperties.getAuth().getTokenSecret(),
//                new Date(now.getTime() + refreshTokenExpiry)
//        );
//
//        // userIdentity refresh token 으로 DB 확인
//        RefreshToken userRefreshToken = tokenService.findById(id);
//        if (userRefreshToken == null) {
//            // 없는 경우 새로 등록
//            userRefreshToken = new RefreshToken(id, refreshToken.getToken());
//            tokenService.saveToken(userRefreshToken);
//        } else {
//            // DB에 refresh 토큰 업데이트
//            tokenService.setRefreshToken(id,refreshToken.getToken());
//        }
//
//        int cookieMaxAge = (int) refreshTokenExpiry / 60;
//        CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
//        CookieUtil.addCookie(response, REFRESH_TOKEN, refreshToken.getToken(), cookieMaxAge);
//
//        return ApiResponse.success("token", accessToken.getToken());
//    }

//    @GetMapping("/refresh")
//    public ApiResponse refreshToken (HttpServletRequest request, HttpServletResponse response) {
////        // access token 확인
//        String accessToken = HeaderUtil.getAccessToken(request);
//        AuthToken authToken = tokenProvider.convertAuthToken(accessToken);
////        if (authToken.validate()) {
////            return ApiResponse.invalidAccessToken();
////        }
//
//        // expired access token 인지 확인
//        Claims claims = authToken.getExpiredTokenClaims();
//        if (claims == null) {
//            return ApiResponse.notExpiredTokenYet();
//        }
//
//        String userId = claims.getSubject();
//        RoleType roleType = RoleType.of(claims.get("role", String.class));
//
//        // refresh token
//        String refreshToken = CookieUtil.getCookie(request, REFRESH_TOKEN)
//                .map(Cookie::getValue)
//                .orElse((null));
//        AuthToken authRefreshToken = tokenProvider.convertAuthToken(refreshToken);
//
//        if (!authRefreshToken.validate()) {
//            return ApiResponse.invalidRefreshToken();
//        }
//
//        // userId refresh token 으로 DB 확인
//        RefreshToken userRefreshToken = tokenService.findTokenWithValues(userId, refreshToken);
//        if (userRefreshToken == null) {
//            return ApiResponse.invalidRefreshToken();
//        }
//
//        Date now = new Date();
//        AuthToken newAccessToken = tokenProvider.createAuthToken(
//                userId,
//                roleType.getCode(),
//                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
//        );
//
//        long validTime = authRefreshToken.getTokenClaims().getExpiration().getTime() - now.getTime();
//
//        // refresh 토큰 기간이 3일 이하로 남은 경우, refresh 토큰 갱신
//        if (validTime <= THREE_DAYS_MSEC) {
//            // refresh 토큰 설정
//            long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();
//
//            authRefreshToken = tokenProvider.createAuthToken(
//                    appProperties.getAuth().getTokenSecret(),
//                    new Date(now.getTime() + refreshTokenExpiry)
//            );
//
//            // DB에 refresh 토큰 업데이트
//            userRefreshToken.setRefreshToken(authRefreshToken.getToken());
//
//            int cookieMaxAge = (int) refreshTokenExpiry / 60;
//            CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
//            CookieUtil.addCookie(response, REFRESH_TOKEN, authRefreshToken.getToken(), cookieMaxAge);
//        }
//
//        return ApiResponse.success("token", newAccessToken.getToken());
//    }
//}
