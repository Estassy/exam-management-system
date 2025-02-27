package com.miage.backend.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfiguration;


/**
 * Configuration de l'application pour la gestion des CORS (Cross-Origin Resource Sharing).
 * Cette classe définit un filtre CORS qui spécifie les paramètres CORS pour permettre
 * les requêtes provenant d'une origine spécifiée.
 * Autorise les requettes back-front depuis l'URL <a href="http://localhost:3000">...</a>
 */

@Configuration
public class CORSConfig {
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}