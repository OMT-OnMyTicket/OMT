package twoman.omt.api.entity.auth;

import lombok.*;

@Getter @NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Setter
public class AuthReqModel {
    private String id;
    private String password;
}
