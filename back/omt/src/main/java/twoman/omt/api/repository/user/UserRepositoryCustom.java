package twoman.omt.api.repository.user;

import twoman.omt.api.entity.user.User;

public interface UserRepositoryCustom {
    User findUserWithFetch(String userIdentity);

    User findUserTop4Fetch(String userIdentity);
}
