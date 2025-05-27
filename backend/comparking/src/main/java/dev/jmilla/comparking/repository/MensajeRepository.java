package dev.jmilla.comparking.repository;

import dev.jmilla.comparking.entity.Mensaje;
import dev.jmilla.comparking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MensajeRepository extends JpaRepository<Mensaje, Long> {

    List<Mensaje> findByEmisor(User emisor);

    List<Mensaje> findByReceptor(User receptor);

    List<Mensaje> findByEmisorAndReceptorOrReceptorAndEmisor(User emisor1, User receptor1, User emisor2, User receptor2);
}
