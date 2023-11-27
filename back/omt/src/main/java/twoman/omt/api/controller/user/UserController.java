package twoman.omt.api.controller.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import twoman.omt.api.dto.UserDto;
import twoman.omt.api.entity.user.User;
import twoman.omt.api.service.UserService;
import twoman.omt.common.ApiResponse;
import twoman.omt.global.annotation.CurrentUser;
import twoman.omt.oauth.entity.UserPrincipal;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping()
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<?> getUser(@CurrentUser UserPrincipal userPrincipal) {
        UserDto.Response user = userService.getUserResponse(userPrincipal.getUserIdentity());

        return ApiResponse.success("user", user);
    }

}
