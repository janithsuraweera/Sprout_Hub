package com.sprouthub.sprouthub.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(@SuppressWarnings("null") CorsRegistry registry) {
        registry.addMapping("/api/**") //api
                .allowedOrigins("http://localhost:5173")  //frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") //methods
                .allowedHeaders("*") //headers
                .allowCredentials(true); //credentials
    }
}