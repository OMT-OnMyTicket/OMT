package twoman.omt.oauth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import twoman.omt.api.entity.user.User;
import twoman.omt.api.repository.user.UserRepository;
import twoman.omt.global.exception.BusinessLogicException;
import twoman.omt.global.exception.ExceptionCode;
import twoman.omt.oauth.entity.ProviderType;
import twoman.omt.oauth.entity.RoleType;
import twoman.omt.oauth.entity.UserPrincipal;
import twoman.omt.oauth.exception.OAuthProviderMissMatchException;
import twoman.omt.oauth.info.OAuth2UserInfo;
import twoman.omt.oauth.info.OAuth2UserInfoFactory;

import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class OAuth2UserCustomService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user = super.loadUser(userRequest);

        saveOrUpdate(user);

        return user;
    }

    private User saveOrUpdate(OAuth2User oAuth2User){
        Map<String, Object> attributes = oAuth2User.getAttributes();
        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");
        User user = userRepository.findByEmail(email)
                .map(entity -> entity.update(name))
                .orElse(User.builder()
                        .email(email)
                        .nickName(name)
                        .build()
                );

        return userRepository.save(user);
    }
}

