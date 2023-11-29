package twoman.omt.oauth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import twoman.omt.api.entity.user.User;
import twoman.omt.api.repository.user.UserRepository;
import twoman.omt.oauth.entity.UserPrincipal;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserIdentity(username);
        if(user == null){
            throw new UsernameNotFoundException(username);
        }
        return UserPrincipal.create(user);
    }
}
