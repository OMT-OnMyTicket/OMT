package twoman.omt.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import twoman.omt.api.entity.RefreshToken;


import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<twoman.omt.api.entity.RefreshToken> findByUserId(Long userId);
    Optional<twoman.omt.api.entity.RefreshToken> findByRefreshToken(String refreshToken);
}
