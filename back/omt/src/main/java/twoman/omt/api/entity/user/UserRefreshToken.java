package twoman.omt.api.entity.user;

import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "USER_REFRESH_TOKENS")
public class UserRefreshToken {
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_REFRESH_TOKEN_ID")
    private Long Id;

    @Column(length = 64, unique = true,nullable = false)
    @NotNull
    @Size(max = 64)
    private String userId;

    @Column(length = 256)
    @NotNull
    @Size(max = 256)
    private String refreshToken;

    public UserRefreshToken(
            @NotNull @Size(max =64 ) String userId,
            @NotNull @Size(max = 256) String refreshToken
    ) {
        this.userId = userId;
        this.refreshToken = refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
