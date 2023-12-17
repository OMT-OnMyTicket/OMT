package twoman.omt.api.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;
import twoman.omt.api.entity.user.User;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class UserDto {

    @Getter
    @AllArgsConstructor
    @Setter
    public static class Response{
        Long seq;
        String userName;
        String imageUrl;

        public Response(User user) {
            this.seq = user.getUserSeq();
            this.userName = user.getUsername();
            this.imageUrl = user.getProfileImageUrl();
        }
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Update{
        String profileImageUrl;
    }

}
