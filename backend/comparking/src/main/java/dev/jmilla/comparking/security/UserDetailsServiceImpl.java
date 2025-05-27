package dev.jmilla.comparking.security;

import dev.jmilla.comparking.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Permite que Spring Security cargue el usuario desde la base de datos para autenticación.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.debug("Buscando usuario por username: {}", username);
        return userService.findByUsername(username).orElseThrow(() ->
                new UsernameNotFoundException("Usuario no encontrado: " + username)
        );
    }
}
