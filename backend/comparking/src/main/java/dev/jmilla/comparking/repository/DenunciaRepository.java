package dev.jmilla.comparking.repository;

import dev.jmilla.comparking.entity.Aparcamiento;
import dev.jmilla.comparking.entity.Denuncia;
import dev.jmilla.comparking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DenunciaRepository extends JpaRepository<Denuncia, Long> {

    List<Denuncia> findByDenunciante(User denunciante);

    List<Denuncia> findByDenunciado(User denunciado);

    List<Denuncia> findByAparcamiento(Aparcamiento aparcamiento);
}
