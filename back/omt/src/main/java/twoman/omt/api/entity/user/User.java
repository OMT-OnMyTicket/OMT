package twoman.omt.api.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import twoman.omt.api.entity.movie.Movie;
import twoman.omt.global.entity.BaseEntity;
import twoman.omt.oauth.entity.ProviderType;
import twoman.omt.oauth.entity.RoleType;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class User extends BaseEntity {
    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userSeq;

    @Column(length = 64, unique = true)
    @NotNull
    @Size(max = 64)
    private String userIdentity;

    @Column(length = 64)
    @NotNull
    @Size(max = 64)
    private String username;

    @JsonIgnore
    @Column(length = 128, nullable = false)
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

    @Column(length = 20)
    @NotNull
    @Enumerated(EnumType.STRING)
    private Grade rating;  // 10개(실버)  30개(골드) 50개(플레) 100개(다이아)

    @OneToMany(mappedBy ="user",fetch = FetchType.LAZY)
    private List<Movie> movies = new ArrayList<>();

    //자주가는 극장 , 결제수단 String

    public User(
            @NotNull @Size(max = 64) String userIdentity,
            @NotNull @Size(max = 100) String username,
            @NotNull @Size(max = 512) String email,
            @NotNull String password,
            @NotNull @Size(max = 1) String emailVerifiedYn,
            @Size(max = 512) String profileImageUrl,
            @NotNull ProviderType providerType,
            @NotNull RoleType roleType
    ) {
        this.userIdentity = userIdentity;
        this.username = username;
        this.password = password;
        this.email = email !=null ? email : "NO_EMAIL";
        this.emailVerifiedYn = emailVerifiedYn;
        this.profileImageUrl = profileImageUrl != null ? profileImageUrl : "";
        this.providerType =providerType;
        this.roleType =roleType;
        this.rating = Grade.BRONZE;
    }

    public void setUsername(String nickname) {
        this.username = nickname;
    }


    public void updateImage(String profileImageUrl){
        this.profileImageUrl = profileImageUrl;
    }

    public void updateGrade(){
        if(movies.size() <=5) this.rating = Grade.BRONZE;
        else if(movies.size() <=10) this.rating = Grade.SILVER;
        else if(movies.size() <=20) this.rating = Grade.GOLD;
        else if(movies.size() <=40) this.rating = Grade.DIAMOND;
        else this.rating = Grade.VIP;
    }

    public void deleteImage(){
        this.profileImageUrl = null;
    }

    public void setUserSeq(Long seq){
        userSeq = seq;
    }

}
