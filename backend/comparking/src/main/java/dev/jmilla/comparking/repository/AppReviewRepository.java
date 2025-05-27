package dev.jmilla.comparking.repository;

import dev.jmilla.comparking.entity.AppReview;
import dev.jmilla.comparking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppReviewRepository extends JpaRepository<AppReview, Long> {

    List<AppReview> findByUser(User user);
}
