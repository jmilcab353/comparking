package dev.jmilla.comparking.repository;

import dev.jmilla.comparking.entity.Aparcamiento;
import dev.jmilla.comparking.entity.Reserva;
import dev.jmilla.comparking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    List<Reserva> findByUsuario(User usuario);

    List<Reserva> findByAparcamiento(Aparcamiento aparcamiento);
}
