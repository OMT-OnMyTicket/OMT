package twoman.omt.api.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;

import twoman.omt.api.entity.user.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long>,UserRepositoryCustom {

    Optional<User> findByEmail(String email);

    Optional<User> findByGoogleIdentity(String identity);

    Optional<User> findByNickName(String nickname);
}
