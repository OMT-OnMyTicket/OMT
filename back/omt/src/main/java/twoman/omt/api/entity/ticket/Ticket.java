package twoman.omt.api.entity.ticket;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import twoman.omt.api.domain.theater.entity.Cinema;
import twoman.omt.audit.Auditable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Ticket extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketId;

    @Column(length = 64)
    @NotNull
    @Size(max =64)
    private String movieTitle;

    @Column(length = 32)
    @NotNull
    @Size(max = 32)
    private LocalDateTime viewDate;

    @NotNull
    private Integer audience;

    @Column(length = 16)
    @NotNull
    @Size(max = 16)
    @Enumerated(EnumType.STRING)
    private Cinema cinema;

    public Ticket(
            @NotNull @Size(max =64) String movieTitle,
            @NotNull @Size(max =32)LocalDateTime viewDate,
            @NotNull Integer audience,
            @NotNull @Size(max =16)Cinema cinema
    ) {
        this.movieTitle = movieTitle;
        this.viewDate = viewDate;
        this.audience = audience;
        this.cinema = cinema;
    }
}
