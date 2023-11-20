package twoman.omt;

import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import twoman.omt.config.properties.AppProperties;
import twoman.omt.config.properties.CorsProperties;

@SpringBootApplication
@EnableJpaAuditing
@EnableConfigurationProperties({CorsProperties.class, AppProperties.class})
public class OmtApplication {

	public static void main(String[] args) {
		SpringApplication.run(OmtApplication.class, args);
	}

}
