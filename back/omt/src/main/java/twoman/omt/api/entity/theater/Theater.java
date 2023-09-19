package twoman.omt.api.entity.theater;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Theater {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long theaterId;

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
            @NotNull Cinema cinema,
            @NotNull @Size(max = 16) String cinemaName)
    {
       this.region = region;
       this.cinema = cinema;
       this.cinemaName = cinemaName;
    }
}
