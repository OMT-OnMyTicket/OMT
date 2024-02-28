package twoman.omt.api.entity.movie;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import twoman.omt.api.entity.user.User;
import twoman.omt.global.entity.BaseEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Movie extends BaseEntity {
    @Id@GeneratedValue
    @Column(name = "movie_id")
    private Long id;

    @Column(length = 512)
    @NotNull
    @Size(max = 512)
    private String title;

    @Column(length = 512)
    @NotNull
    @Size(max = 512)
    private String posterImageUrl;

    @Column(length = 64)
    @NotNull
    @Size(max = 64)
    private String genre;

    @Column(length = 1024)@Size(max = 1024)
    private String review;

    private Boolean isLike = false;

    private Integer grade; // 나만의 평점

    @Column(length = 512)
    @Size(max = 512)
    private String companion; // 같이 관람한 사람


    @JoinColumn(name = "USER_SEQ")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public Movie(String title, String posterImageUrl, String genre) {
        this.title = title;
        this.posterImageUrl = posterImageUrl;
        this.genre = genre;
    }

    public void changeLike(boolean bool){
        isLike = bool;
    }

    public void setTicketValues(String review, Integer grade, String companion){
        this.review =review;
        this.grade = grade;
        this.companion = companion;
    }

    public void setUser(User user){
        this.user = user;
        this.user.getMovies().add(this);
    }

    public void deleteMovie(User user){
        this.user.getMovies().remove(this);
        this.user = null;
    }

    public void setLikeTrue(){
        this.isLike = true;
    }


}
