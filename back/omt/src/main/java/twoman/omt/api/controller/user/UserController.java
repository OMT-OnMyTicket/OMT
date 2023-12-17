package twoman.omt.api.controller.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import twoman.omt.api.entity.dto.UserDto;

import twoman.omt.api.service.UserService;
import twoman.omt.common.ApiResponse;
import twoman.omt.config.properties.AppProperties;
import twoman.omt.oauth.token.AuthTokenProvider;


@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;


    @GetMapping
    public ApiResponse getUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        UserDto.Response response = userService.getUserResponse(principal.getUsername());

        return ApiResponse.success("response", response);
    }

    @PatchMapping("/image")
    public ApiResponse updateUser(@RequestBody UserDto.Update updateDto){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserDto.Response response = userService.updateUser(principal.getUsername(), updateDto);

        return ApiResponse.success("response", response);
    }

    @DeleteMapping("/image")
    public ApiResponse deleteImage() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserDto.Response response = userService.deleteImage(principal.getUsername());

        return ApiResponse.success("response", response);
    }


}
