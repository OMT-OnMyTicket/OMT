package twoman.omt.api.entity.auth;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter @NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Setter
public class AuthReqModel {
    @NotNull(message = "Null 값은 입력할 수 없습니다.")
    @NotBlank
    private String identity;
    @NotNull(message = "Null 값은 입력할 수 없습니다.")
    @NotBlank
    private String password;
}
