package twoman.omt.api.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import twoman.omt.api.dto.TheaterDto;
import twoman.omt.api.entity.Cinema;
import twoman.omt.api.entity.Theater;
import twoman.omt.api.repository.TheaterRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class TheaterService {
    TheaterRepository repository;

    public List<TheaterDto.Response> findTheaters(String region){
        List<Theater> theaters = repository.findByRegion(region);

        return theaters.stream().map(TheaterDto.Response::new)
                .collect(Collectors.toList());
    }

    public List<TheaterDto.Response> findTheaters(String region,String cinema){
        Cinema cine = Cinema.valueOf(cinema);
        List<Theater> theaters = repository.findByRegionAndCinema(region,cine);

        return theaters.stream().map(TheaterDto.Response::new)
                .collect(Collectors.toList());
    }

}