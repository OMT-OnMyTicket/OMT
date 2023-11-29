package twoman.omt.api.controller.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import twoman.omt.api.dto.UserDto;
import twoman.omt.api.entity.user.User;
import twoman.omt.api.service.UserService;
import twoman.omt.common.ApiResponse;


@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;


    @GetMapping
    public ApiResponse getUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        UserDto.Response user = userService.getUserResponse(principal.getUsername());

        return ApiResponse.success("user", user);
    }


}
