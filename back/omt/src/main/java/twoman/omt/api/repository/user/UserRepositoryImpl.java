package twoman.omt.api.repository.user;

import com.querydsl.jpa.impl.JPAQueryFactory;
import twoman.omt.api.entity.movie.QMovie;
import twoman.omt.api.entity.user.QUser;
import twoman.omt.api.entity.user.User;

import javax.persistence.EntityManager;

import java.util.List;

import static twoman.omt.api.entity.movie.QMovie.*;
import static twoman.omt.api.entity.user.QUser.*;

public class UserRepositoryImpl implements UserRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    public UserRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }
    @Override
    public User findUserWithFetch(String userIdentity) {
        return queryFactory
                .selectFrom(user)
                .join(user.movies, movie).fetchJoin()
                .where(user.userIdentity.eq(userIdentity))
                .fetchOne();
    }

    @Override
    public User findUserTop4Fetch(String userIdentity) {
        return queryFactory.select(user)
                .from(user)
                .join(user.movies, movie).fetchJoin()
                .where(user.userIdentity.eq(userIdentity).and(movie.grade.isNotNull()))
                .orderBy(movie.grade.desc())
                .limit(4)
                .fetchOne();
    }
}
