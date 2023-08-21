package twoman.omt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import twoman.omt.config.properties.AppProperties;
import twoman.omt.config.properties.CorsProperties;

@SpringBootApplication
@EnableConfigurationProperties({CorsProperties.class, AppProperties.class})
public class OmtApplication {

	public static void main(String[] args) {
		SpringApplication.run(OmtApplication.class, args);
	}

}
