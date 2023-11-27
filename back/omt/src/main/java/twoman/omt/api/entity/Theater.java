package twoman.omt.api.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import twoman.omt.global.entity.BaseEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Theater extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "theater_id")
    private Long Id;

    @Column(length = 16)
    @NotNull
    @Size(max = 16)
    private String region;

    @Column(length = 16)
    @NotNull
    @Enumerated(EnumType.STRING)
    private Cinema cinema;

    @Column(length = 16)
    @NotNull
    @Size(max = 16)
    private String cinemaName;


    public Theater(
            @NotNull @Size(max= 16) String region,
            @NotNull @Size(max= 16) Cinema cinema,
            @NotNull @Size(max = 16) String cinemaName)
    {
       this.region = region;
       this.cinema = cinema;
       this.cinemaName = cinemaName;
    }
}
