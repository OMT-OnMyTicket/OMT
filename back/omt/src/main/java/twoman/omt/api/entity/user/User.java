package twoman.omt.api.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import twoman.omt.api.entity.BaseEntity;
import twoman.omt.oauth.entity.ProviderType;
import twoman.omt.oauth.entity.RoleType;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity {
    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(length = 30)
    @NotNull
    @Size(max = 30)
    private String nickname;
    @Column(length = 512, unique = true)
    @NotNull
    @Size(max = 512)
    private String email;

    @Column(length = 1)
    @NotNull
    @Size(min = 1, max = 1)
    private String emailVerifiedYn;

    @Column(length = 512)
    @Size(max = 512)
    private String profileImageUrl;

    @Column(length = 20)
    @NotNull
    @Enumerated(EnumType.STRING)
    private ProviderType providerType;

    @Column(length = 20)
    @NotNull
    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    public User(
            @NotNull @Size(max = 100) String nickname,
            @NotNull @Size(max = 512) String email,
            @NotNull @Size(max = 1) String emailVerifiedYn,
            @NotNull @Size(max = 512) String profileImageUrl,
            @NotNull ProviderType providerType,
            @NotNull RoleType roleType
    ) {
        this.nickname = nickname;
        this.email = email !=null ? email : "NO_EMAIL";
        this.emailVerifiedYn = emailVerifiedYn;
        this.profileImageUrl = profileImageUrl != null ? profileImageUrl : "";
        this.providerType =providerType;
        this.roleType =roleType;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }
}
