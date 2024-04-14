package twoman.omt.oauth.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import twoman.omt.oauth.repository.OAuth2AuthorizationRequestBasedOnCookieRepository;
import twoman.omt.utils.CookieUtil;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;


//@Component
//@RequiredArgsConstructor
//public class OAuth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {
//
//    private final OAuth2AuthorizationRequestBasedOnCookieRepository authorizationRequestRepository;
//
//    @Override
//    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
//        String targetUrl = CookieUtil.getCookie(request)
//                .map(Cookie::getValue)
//                .orElse(("/"));
//
//        exception.printStackTrace();
//
//        targetUrl = UriComponentsBuilder.fromUriString(targetUrl)
//                .queryParam("error", exception.getLocalizedMessage())
//                .build().encode().toUriString();
//
//        authorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
//
//        getRedirectStrategy().sendRedirect(request, response, targetUrl);
//    }
//}
