package com.examsphere.backend.service;

import com.examsphere.backend.dto.CreateQuestionRequest;
import com.examsphere.backend.dto.QuestionDTO;
import com.examsphere.backend.model.Question;
import com.examsphere.backend.model.Test;
import com.examsphere.backend.repository.QuestionRepository;
import com.examsphere.backend.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    @Autowired private QuestionRepository questionRepository;
    @Autowired private TestRepository testRepository;

    public List<QuestionDTO> getQuestionsForTest(Long testId) {
        return questionRepository.findByTestId(testId).stream()
                .map(q -> new QuestionDTO(q.getId(), q.getQuestionText(),
                        q.getOptionA(), q.getOptionB(), q.getOptionC(), q.getOptionD()))
                .collect(Collectors.toList());
    }

    public List<Question> getAllQuestionsWithAnswers(Long testId) {
        return questionRepository.findByTestId(testId);
    }

    public Question createQuestion(CreateQuestionRequest request) {
        Test test = testRepository.findById(request.getTestId())
                .orElseThrow(() -> new RuntimeException("Test not found"));
        Question q = new Question();
        q.setTest(test);
        q.setQuestionText(request.getQuestionText());
        q.setOptionA(request.getOptionA());
        q.setOptionB(request.getOptionB());
        q.setOptionC(request.getOptionC());
        q.setOptionD(request.getOptionD());
        q.setCorrectOption(request.getCorrectOption());
        q.setExplanation(request.getExplanation());
        return questionRepository.save(q);
    }

    public Question updateQuestion(Long id, CreateQuestionRequest request) {
        Question q = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        q.setQuestionText(request.getQuestionText());
        q.setOptionA(request.getOptionA());
        q.setOptionB(request.getOptionB());
        q.setOptionC(request.getOptionC());
        q.setOptionD(request.getOptionD());
        q.setCorrectOption(request.getCorrectOption());
        q.setExplanation(request.getExplanation());
        return questionRepository.save(q);
    }

    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }
}
