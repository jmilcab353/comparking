package dev.jmilla.comparking.repository;

import dev.jmilla.comparking.entity.Trueque;
import dev.jmilla.comparking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TruequeRepository extends JpaRepository<Trueque, Long> {

    List<Trueque> findByUsuario(User usuario);
}
