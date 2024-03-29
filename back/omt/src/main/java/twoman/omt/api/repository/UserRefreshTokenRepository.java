package twoman.omt.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import twoman.omt.api.entity.user.UserRefreshToken;

public interface UserRefreshTokenRepository extends JpaRepository<UserRefreshToken, Long> {
    UserRefreshToken findByUserIdentity(String userIdentity);
    UserRefreshToken findByUserIdentityAndRefreshToken(String userIdentity, String refreshToken);
}
