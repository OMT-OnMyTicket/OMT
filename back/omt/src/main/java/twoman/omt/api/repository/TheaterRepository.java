package twoman.omt.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import twoman.omt.api.entity.Cinema;
import twoman.omt.api.entity.Theater;

import java.util.List;

public interface TheaterRepository extends JpaRepository<Theater,Long> {


    // 1 : 지역의 모든 영화관
    List<Theater> findByRegion(String region);
    // 2 : 지역의 특정 영화관
    List<Theater> findByRegionAndCinema(String region, Cinema cinema);
}
