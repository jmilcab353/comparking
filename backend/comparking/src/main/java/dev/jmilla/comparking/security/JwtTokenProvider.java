package dev.jmilla.comparking.security;

import dev.jmilla.comparking.entity.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Date;

@Slf4j
@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private Long jwtDurationSeconds;

    public String generateToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        return Jwts.builder()
                .signWith(Keys.hmacShaKeyFor(jwtSecret.getBytes()), SignatureAlgorithm.HS512)
                .setHeaderParam("typ", "JWT")
                .setSubject(Long.toString(user.getIdUser()))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + (jwtDurationSeconds * 1000)))
                .claim("username", user.getUsername())
                .compact();
    }

    public boolean isValidToken(String token) {
        if (!StringUtils.hasLength(token)) return false;

        try {
            Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(jwtSecret.getBytes()))
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            log.info("Token con firma inválida", e);
        } catch (MalformedJwtException | UnsupportedJwtException e) {
            log.info("Token incorrecto o no soportado", e);
        } catch (ExpiredJwtException e) {
            log.info("Token expirado", e);
        }

        return false;
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(jwtSecret.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.get("username").toString();
    }
}
