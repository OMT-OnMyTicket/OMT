package twoman.omt.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import twoman.omt.api.dto.UserDto;
import twoman.omt.api.entity.user.User;
import twoman.omt.api.repository.user.UserRepository;
import twoman.omt.exception.BusinessLogicException;
import twoman.omt.exception.ExceptionCode;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;

    public UserDto.Response getUserResponse(String userIdentity){
        User findUser = userRepository.findByUserIdentity(userIdentity);

        return new UserDto.Response(findUser);
    }
}
