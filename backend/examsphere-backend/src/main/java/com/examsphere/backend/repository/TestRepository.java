package com.examsphere.backend.repository;

import com.examsphere.backend.model.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TestRepository extends JpaRepository<Test, Long> {
    List<Test> findByActiveTrue();
    List<Test> findBySubjectId(Long subjectId);
}
