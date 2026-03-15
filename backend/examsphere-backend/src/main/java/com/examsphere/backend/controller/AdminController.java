package com.examsphere.backend.controller;

import com.examsphere.backend.dto.*;
import com.examsphere.backend.model.Subject;
import com.examsphere.backend.model.Test;
import com.examsphere.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired private TestService testService;
    @Autowired private SubjectService subjectService;
    @Autowired private QuestionService questionService;
    @Autowired private TestAttemptService attemptService;

    // ── Tests ──────────────────────────────────────────────────────────────
    @GetMapping("/tests")
    public ResponseEntity<List<TestDTO>> getAllTests() {
        return ResponseEntity.ok(testService.getAllTests());
    }

    @PostMapping("/tests")
    public ResponseEntity<Test> createTest(@RequestBody CreateTestRequest request) {
        return ResponseEntity.ok(testService.createTest(request));
    }

    @PutMapping("/tests/{id}")
    public ResponseEntity<Test> updateTest(@PathVariable Long id, @RequestBody CreateTestRequest request) {
        return ResponseEntity.ok(testService.updateTest(id, request));
    }

    @DeleteMapping("/tests/{id}")
    public ResponseEntity<String> deleteTest(@PathVariable Long id) {
        testService.deleteTest(id);
        return ResponseEntity.ok("Test deleted");
    }

    @PutMapping("/tests/{id}/toggle")
    public ResponseEntity<String> toggleTest(@PathVariable Long id) {
        testService.toggleActive(id);
        return ResponseEntity.ok("Status toggled");
    }

    // ── Subjects ───────────────────────────────────────────────────────────
    @GetMapping("/subjects")
    public ResponseEntity<List<Subject>> getAllSubjects() {
        return ResponseEntity.ok(subjectService.getAllSubjects());
    }

    @PostMapping("/subjects")
    public ResponseEntity<Subject> createSubject(@RequestBody Subject subject) {
        return ResponseEntity.ok(subjectService.createSubject(subject));
    }

    @PutMapping("/subjects/{id}")
    public ResponseEntity<Subject> updateSubject(@PathVariable Long id, @RequestBody Subject subject) {
        return ResponseEntity.ok(subjectService.updateSubject(id, subject));
    }

    @DeleteMapping("/subjects/{id}")
    public ResponseEntity<String> deleteSubject(@PathVariable Long id) {
        subjectService.deleteSubject(id);
        return ResponseEntity.ok("Subject deleted");
    }

    // ── Questions ──────────────────────────────────────────────────────────
    @PostMapping("/questions")
    public ResponseEntity<?> createQuestion(@RequestBody CreateQuestionRequest request) {
        return ResponseEntity.ok(questionService.createQuestion(request));
    }

    @PutMapping("/questions/{id}")
    public ResponseEntity<?> updateQuestion(@PathVariable Long id, @RequestBody CreateQuestionRequest request) {
        return ResponseEntity.ok(questionService.updateQuestion(id, request));
    }

    @DeleteMapping("/questions/{id}")
    public ResponseEntity<String> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.ok("Question deleted");
    }

    // ── Attempts ───────────────────────────────────────────────────────────
    @GetMapping("/attempts")
    public ResponseEntity<List<AttemptResultDTO>> getAllAttempts() {
        return ResponseEntity.ok(attemptService.getAllAttempts());
    }
}
