package twoman.omt.api.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import twoman.omt.api.entity.user.UserRefreshToken;

public interface UserRefreshTokenRepository extends JpaRepository<UserRefreshToken, Long> {
    UserRefreshToken findByUserIdentity(String userId);
    UserRefreshToken findByUserIdentityAndRefreshToken(String userId, String refreshToken);
}
