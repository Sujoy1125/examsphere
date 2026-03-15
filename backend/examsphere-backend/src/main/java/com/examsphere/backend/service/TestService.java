package com.examsphere.backend.service;

import com.examsphere.backend.dto.CreateTestRequest;
import com.examsphere.backend.dto.TestDTO;
import com.examsphere.backend.model.Subject;
import com.examsphere.backend.model.Test;
import com.examsphere.backend.repository.QuestionRepository;
import com.examsphere.backend.repository.SubjectRepository;
import com.examsphere.backend.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TestService {

    @Autowired private TestRepository testRepository;
    @Autowired private SubjectRepository subjectRepository;
    @Autowired private QuestionRepository questionRepository;

    public List<TestDTO> getAllActiveTests() {
        return testRepository.findByActiveTrue().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<TestDTO> getAllTests() {
        return testRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Test createTest(CreateTestRequest request) {
        Subject subject = subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));
        Test test = new Test();
        test.setTitle(request.getTitle());
        test.setSubject(subject);
        test.setDurationMinutes(request.getDurationMinutes());
        test.setDifficulty(Test.Difficulty.valueOf(request.getDifficulty()));
        test.setActive(request.isActive());
        return testRepository.save(test);
    }

    public Test updateTest(Long id, CreateTestRequest request) {
        Test test = testRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Test not found"));
        if (request.getSubjectId() != null) {
            Subject subject = subjectRepository.findById(request.getSubjectId())
                    .orElseThrow(() -> new RuntimeException("Subject not found"));
            test.setSubject(subject);
        }
        test.setTitle(request.getTitle());
        test.setDurationMinutes(request.getDurationMinutes());
        test.setDifficulty(Test.Difficulty.valueOf(request.getDifficulty()));
        test.setActive(request.isActive());
        return testRepository.save(test);
    }

    public void deleteTest(Long id) {
        testRepository.deleteById(id);
    }

    public void toggleActive(Long id) {
        Test test = testRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Test not found"));
        test.setActive(!test.isActive());
        testRepository.save(test);
    }

    private TestDTO toDTO(Test test) {
        int count = questionRepository.countByTestId(test.getId());
        String subject = test.getSubject() != null ? test.getSubject().getName() : "General";
        String difficulty = test.getDifficulty() != null ? test.getDifficulty().name() : "Medium";
        return new TestDTO(test.getId(), test.getTitle(), subject,
                test.getDurationMinutes(), difficulty, test.isActive(), count);
    }
}
