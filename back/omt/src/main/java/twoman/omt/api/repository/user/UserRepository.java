package twoman.omt.api.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import twoman.omt.api.entity.user.User;

public interface UserRepository extends JpaRepository<User,Long> {
    User findByEmail(String email);
}
