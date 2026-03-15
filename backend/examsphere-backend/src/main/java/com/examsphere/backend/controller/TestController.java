package com.examsphere.backend.controller;

import com.examsphere.backend.dto.QuestionDTO;
import com.examsphere.backend.dto.TestDTO;
import com.examsphere.backend.service.QuestionService;
import com.examsphere.backend.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tests")
@CrossOrigin(origins = "http://localhost:5173")
public class TestController {

    @Autowired private TestService testService;
    @Autowired private QuestionService questionService;

    @GetMapping
    public ResponseEntity<List<TestDTO>> getAllTests() {
        return ResponseEntity.ok(testService.getAllActiveTests());
    }

    @GetMapping("/{testId}/questions")
    public ResponseEntity<List<QuestionDTO>> getQuestions(@PathVariable Long testId) {
        return ResponseEntity.ok(questionService.getQuestionsForTest(testId));
    }
}
