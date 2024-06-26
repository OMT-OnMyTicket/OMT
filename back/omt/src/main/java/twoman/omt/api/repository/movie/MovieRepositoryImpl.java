package twoman.omt.api.repository.movie;

import com.querydsl.jpa.impl.JPAQueryFactory;
import twoman.omt.api.entity.movie.Movie;
import javax.persistence.EntityManager;
import java.util.List;

import static twoman.omt.api.entity.movie.QMovie.movie;
import static twoman.omt.api.entity.user.QUser.user;


public class MovieRepositoryImpl implements MovieRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    public MovieRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<String> findMoviesWithTitle(String title) {
        return queryFactory.select(movie.review).from(movie)
                .where(movie.title.eq(title).and(movie.review.isNotNull()))
                .fetch();
    }

    @Override
    public List<Movie> findMoviesWithLike(String nickName) {
        return queryFactory.selectFrom(movie)
                .join(movie.user,user).fetchJoin()
                .where(user.nickName.eq(nickName).and(movie.isLike.eq(true)))
                .fetch();
    }
}
