package twoman.omt.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import twoman.omt.api.entity.user.UserRefreshToken;
import twoman.omt.api.repository.UserRefreshTokenRepository;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserRefreshTokenService {

    private final UserRefreshTokenRepository repository;
    public UserRefreshToken findById(String id) {
        UserRefreshToken response = repository.findByUserIdentity(id);
        return response;
    }

    @Transactional
    public void saveToken(UserRefreshToken userRefreshToken) {
        repository.save(userRefreshToken);
    }


    public UserRefreshToken findTokenWithValues(String userId, String refreshToken) {
        return repository.findByUserIdentityAndRefreshToken(userId,refreshToken);
    }
    @Transactional
    public void setRefreshToken(String userId, String token) {
        UserRefreshToken refreshToken = repository.findByUserIdentity(userId);
        refreshToken.setRefreshToken(token);
    }
}
