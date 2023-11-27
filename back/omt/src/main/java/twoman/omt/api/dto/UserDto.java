package twoman.omt.api.dto;

import lombok.Getter;
import twoman.omt.api.entity.user.User;

public class UserDto {

    @Getter
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

}
