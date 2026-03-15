package com.examsphere.backend.repository;

import com.examsphere.backend.model.TestAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface TestAttemptRepository extends JpaRepository<TestAttempt, Long> {
    List<TestAttempt> findByUserIdOrderByAttemptedAtDesc(Long userId);
    List<TestAttempt> findByTestIdOrderByScoreDesc(Long testId);

    @Query("SELECT ta FROM TestAttempt ta ORDER BY ta.score DESC")
    List<TestAttempt> findAllOrderByScoreDesc();

    boolean existsByUserIdAndTestId(Long userId, Long testId);
}
