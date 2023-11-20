package twoman.omt.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import twoman.omt.api.dto.TheaterDto;
import twoman.omt.api.service.TheaterService;
import twoman.omt.common.ApiResponse;

import java.util.List;

@RestController
@RequestMapping("api/v1/theaters")
@RequiredArgsConstructor
public class TheaterController {

    private final TheaterService theaterService;


    @GetMapping("/region")
    public ApiResponse getTheatersByRegion(@RequestParam String region){

        List<TheaterDto.Response> responses = theaterService.findTheaters(region);

        return ApiResponse.success("theaters",responses);
    }

    @GetMapping("/region/cinema")
    public ApiResponse getTheatersByRegion(@RequestParam String region,
                                           @RequestParam String cinema){

        List<TheaterDto.Response>  responses = theaterService.findTheaters(region,cinema);

        return ApiResponse.success("theaters",responses);
    }
}
