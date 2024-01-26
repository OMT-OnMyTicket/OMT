package twoman.omt.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import twoman.omt.api.entity.dto.TheaterDto;
import twoman.omt.api.service.TheaterService;
import twoman.omt.common.ApiResponse;

import java.util.List;

@RestController
@RequestMapping("api/all/")
@RequiredArgsConstructor
public class TheaterController {

    private final TheaterService theaterService;

    @GetMapping("/healthcheck")
    public String healthcheck() {
        return "OK";
    }

    @GetMapping("/theaters/region")
    public ApiResponse getTheatersByRegion(@RequestParam String region){
        List<TheaterDto.Response> responses = theaterService.findTheaters(region);

        return ApiResponse.success("theaters",responses);
    }

    @GetMapping("/theaters/region/cinema")
    public ApiResponse getTheatersByRegionAndCinema(@RequestParam String region, @RequestParam String cinema){
        List<TheaterDto.Response>  responses = theaterService.findTheaters(region,cinema);

        return ApiResponse.success("theaters",responses);
    }
}
