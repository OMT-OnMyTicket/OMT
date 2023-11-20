package twoman.omt.api.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Movie {
    @Id@GeneratedValue
    @Column(name = "movie_id")
    private Long id;

    @Column(length = 64)
    @NotNull
    private String title;

    @Column(length = 512)
    @NotNull
    @Size(max = 512)
    private String posterImageUrl;

    @Column(length = 1024)@Size(max = 512)
    private String review;

    private Boolean isLike = null;

    public void changeLike(boolean bool){
        isLike = bool;
    }

    public void setReview(String review){
        this.review =review;
    }



}
