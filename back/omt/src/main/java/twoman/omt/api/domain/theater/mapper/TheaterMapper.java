package twoman.omt.api.domain.theater.mapper;
import org.mapstruct.Mapper;
import twoman.omt.api.domain.theater.dto.TheaterDto;
import twoman.omt.api.domain.theater.entity.Theater;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TheaterMapper {

//    TheaterMapper INSTANCE = Mappers.getMapper(TheaterMapper.class);

    TheaterDto.Response theaterToResponse(Theater theater);

    List<TheaterDto.Response> theatersToListResponses(List<Theater> theaters);
}
