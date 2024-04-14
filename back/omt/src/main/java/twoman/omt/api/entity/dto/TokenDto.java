package twoman.omt.api.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class TokenDto {

    @Getter
    @Setter
    public static class CreateAccessTokenRequest {
        private String refreshToken;
    }

    @Getter
    @AllArgsConstructor
    public static class CreateAccessTokenResponse {
        private String accessToken;
    }
}
