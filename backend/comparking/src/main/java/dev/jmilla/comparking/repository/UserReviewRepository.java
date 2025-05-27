package dev.jmilla.comparking.repository;

import dev.jmilla.comparking.entity.Aparcamiento;
import dev.jmilla.comparking.entity.User;
import dev.jmilla.comparking.entity.UserReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserReviewRepository extends JpaRepository<UserReview, Long> {

    List<UserReview> findByReviewer(User reviewer);

    List<UserReview> findByReviewed(User reviewed);

    List<UserReview> findByAparcamiento(Aparcamiento aparcamiento);
}
