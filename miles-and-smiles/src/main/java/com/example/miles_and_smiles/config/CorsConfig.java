package com.example.miles_and_smiles.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        // Create a source object that maps URL patterns to CORS configurations
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        // Create a CORS configuration object
        CorsConfiguration config = new CorsConfiguration();

        // Allow cookies or credentials to be included in requests
        config.setAllowCredentials(true);

        // Allow requests from the React app running locally during development
        // Example for deployment:
        // config.setAllowedOriginPatterns(List.of("https://yourfrontenddomain.com"));
        config.setAllowedOriginPatterns(List.of("http://localhost:5173"));

        // Allow all headers
        config.addAllowedHeader("*");

        // Allow all HTTP methods (GET, POST, PUT, DELETE)
        config.addAllowedMethod("*");

        // Apply this configuration to all routes in backend
        source.registerCorsConfiguration("/**", config);

        // Return a CORS filter with this configuration
        return new CorsFilter(source);
    }
}
