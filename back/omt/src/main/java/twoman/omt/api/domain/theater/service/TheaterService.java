package twoman.omt.api.domain.theater.service;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import twoman.omt.api.domain.theater.dto.TheaterDto;
import twoman.omt.api.domain.theater.entity.Cinema;
import twoman.omt.api.domain.theater.entity.Theater;
import twoman.omt.api.domain.theater.mapper.TheaterMapper;
import twoman.omt.api.domain.theater.repository.TheaterRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class TheaterService {
    TheaterMapper mapper;
    TheaterRepository repository;



    public List<TheaterDto.Response> findTheaters(String region){
        List<Theater> theaters = repository.findTheaterByRegion(region);

        return mapper.theatersToListResponses(theaters);
    }

    public List<TheaterDto.Response> findTheaters(String region,String cinema){
        Cinema cine = Cinema.valueOf(cinema);
        List<Theater> theaters = repository.findTheaterByRegionAndCinema(region,cine);

        return mapper.theatersToListResponses(theaters);
    }

}
