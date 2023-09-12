package twoman.omt.api.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import twoman.omt.audit.Auditable;
import twoman.omt.oauth.entity.ProviderType;
import twoman.omt.oauth.entity.RoleType;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "USERS")
public class User extends Auditable {
    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(length =64, unique = true)
    @NotNull
    @Size(max = 64)
    private String userIdentity;

    @Column(length = 30)
    @NotNull
    @Size(max = 30)
    private String nickname;

    @JsonIgnore
    @Column(length = 128)
    @NotNull
    @Size(max = 128)
    private String password;

    @Column(length = 512, unique = true)
    @NotNull
    @Size(max = 512)
    private String email;

    @Column(length = 1)
    @NotNull
    @Size(min = 1, max = 1)
    private String emailVerifiedYn;

    @Column(length = 512)
    @NotNull
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
            @NotNull @Size(max = 64) String Identity,
            @NotNull @Size(max = 100) String nickname,
            @NotNull @Size(max = 512) String email,
            @NotNull @Size(max = 1) String emailVerifiedYn,
            @NotNull @Size(max = 512) String profileImageUrl,
            @NotNull ProviderType providerType,
            @NotNull RoleType roleType
    ) {
        this.userIdentity = Identity;
        this.nickname = nickname;
        this.password = "NO_PASS";
        this.email = email !=null ? email : "NO_EMAIL";
        this.emailVerifiedYn = emailVerifiedYn;
        this.profileImageUrl = profileImageUrl != null ? profileImageUrl : "";
        this.providerType =providerType;
        this.roleType =roleType;
    }
}
