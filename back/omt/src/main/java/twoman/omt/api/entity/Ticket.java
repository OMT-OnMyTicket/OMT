package twoman.omt.api.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Ticket {
    @Id@GeneratedValue
    private Long id;

    //성인 청소년 노인 유아 // front 가격 총합을 넘겨주면 -> 인원수 * 12,000


}
