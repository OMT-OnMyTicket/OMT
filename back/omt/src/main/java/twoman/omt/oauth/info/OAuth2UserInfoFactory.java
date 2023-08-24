package twoman.omt.oauth.info;

import twoman.omt.oauth.entity.ProviderType;
import twoman.omt.oauth.info.impl.GoogleOAuth2UserInfo;

import java.util.Map;

import static twoman.omt.oauth.entity.ProviderType.*;


public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(ProviderType providerType, Map<String,Object> attributes) {
        switch (providerType) {
            case GOOGLE : return new GoogleOAuth2UserInfo(attributes);
            //case NAVER: return new NaverOAuth2UserInfo(attributes);
            //case KAKAO: return new KakaoOAuth2UserInfo(attributes);
            default: throw new IllegalArgumentException("Invalid Provider Type.");
        }
    }
}
