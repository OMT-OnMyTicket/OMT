package twoman.omt.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import twoman.omt.api.entity.dto.TokenDto;
import twoman.omt.api.service.TokenService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/token")
public class TokenApiController {
    private final TokenService tokenService;

    @PostMapping()
    public ResponseEntity<TokenDto.CreateAccessTokenResponse> createNewAccessToken(@RequestBody TokenDto.CreateAccessTokenRequest request){
        String newAccessToken = tokenService.createNewAccessToken(request.getRefreshToken());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new TokenDto.CreateAccessTokenResponse(newAccessToken));
    }

}
