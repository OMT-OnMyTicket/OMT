package twoman.omt.api.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import twoman.omt.api.entity.user.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    User findByUserIdentity(String userIdentity);
    Optional<User> findByUserSeq(Long userSeq);

}
