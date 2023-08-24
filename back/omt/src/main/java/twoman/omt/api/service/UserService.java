package twoman.omt.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import twoman.omt.api.entity.user.User;
import twoman.omt.api.repository.user.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUser(String userId){
        return userRepository.findByUserIdentity(userId);
    }
}
