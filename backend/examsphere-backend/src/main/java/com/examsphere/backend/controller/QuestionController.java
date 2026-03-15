package com.examsphere.backend.controller;

import com.examsphere.backend.dto.CreateQuestionRequest;
import com.examsphere.backend.model.Question;
import com.examsphere.backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "http://localhost:5173")
public class QuestionController {

    @Autowired private QuestionService questionService;

    @GetMapping("/test/{testId}")
    public ResponseEntity<List<Question>> getQuestionsWithAnswers(@PathVariable Long testId) {
        return ResponseEntity.ok(questionService.getAllQuestionsWithAnswers(testId));
    }

    @PostMapping
    public ResponseEntity<Question> createQuestion(@RequestBody CreateQuestionRequest request) {
        return ResponseEntity.ok(questionService.createQuestion(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody CreateQuestionRequest request) {
        return ResponseEntity.ok(questionService.updateQuestion(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.ok("Question deleted");
    }
}
