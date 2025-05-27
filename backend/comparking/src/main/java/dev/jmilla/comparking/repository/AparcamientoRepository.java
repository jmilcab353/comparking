package dev.jmilla.comparking.repository;

import dev.jmilla.comparking.entity.Aparcamiento;
import dev.jmilla.comparking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AparcamientoRepository extends JpaRepository<Aparcamiento, Long> {

    List<Aparcamiento> findByUser(User user);

    List<Aparcamiento> findByLocalidad(String localidad);

    List<Aparcamiento> findByProvincia(String provincia);
}
