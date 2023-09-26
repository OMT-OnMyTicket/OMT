package twoman.omt.api.domain.theater.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import twoman.omt.api.domain.theater.entity.Cinema;
import twoman.omt.api.domain.theater.entity.Theater;

import java.util.List;

public interface TheaterRepository extends JpaRepository<Theater,Long> {
    // 1 : 지역의 모든 영화관
    // 2 : 지역의 특정 영화관
    @Query(value = "select t from Theater t where t.region = :region ")
    List<Theater> findTheaterByRegion(@Param("region") String region);
    @Query(value = "select t from Theater t where t.region = :region and t.cinema = :cinema")
    List<Theater> findTheaterByRegionAndCinema(@Param("region") String region, @Param("cinema") Cinema cinema);
}
