package dev.jmilla.comparking.config;

import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenApiCustomizer customOpenApi() {
        return openApi -> openApi.setInfo(new Info()
                .title("Comparking")
                .description("Documentación de la API REST para la aplicación web Comparking")
                .version("1.0.0")
                .contact(new Contact()
                        .name("Jesús Milla")
                        .email("jmilcab353@g.educaand.es")
                ));
    }
}
