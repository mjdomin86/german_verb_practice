package com.mjdomin.germanverbpractice.service;

import com.mjdomin.germanverbpractice.dto.PracticeAnswerDTO;
import com.mjdomin.germanverbpractice.dto.PracticeResultDTO;
import com.mjdomin.germanverbpractice.dto.VerbDTO;
import com.mjdomin.germanverbpractice.model.PracticeSession;
import com.mjdomin.germanverbpractice.model.Verb;
import com.mjdomin.germanverbpractice.repository.PracticeSessionRepository;
import com.mjdomin.germanverbpractice.repository.VerbRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PracticeService {
    
    @Autowired
    private VerbRepository verbRepository;
    
    @Autowired
    private PracticeSessionRepository practiceSessionRepository;
    
    @Autowired
    private VerbService verbService;
    
    public PracticeResultDTO checkAnswer(PracticeAnswerDTO answerDTO) {
        Verb verb = verbRepository.findById(answerDTO.getVerbId())
                .orElseThrow(() -> new IllegalArgumentException("Verb not found"));
        
        boolean prepositionCorrect = verb.getPreposition().equals(answerDTO.getSelectedPreposition());
        boolean meaningCorrect = verb.getMeaning().equals(answerDTO.getSelectedMeaning());
        boolean caseCorrect = verb.getGrammaticalCase().equals(answerDTO.getSelectedCase());
        boolean allCorrect = prepositionCorrect && meaningCorrect && caseCorrect;
        
        VerbDTO correctAnswer = verbService.getVerbById(verb.getId()).orElse(null);
        
        return new PracticeResultDTO(
                allCorrect,
                prepositionCorrect,
                meaningCorrect,
                caseCorrect,
                correctAnswer
        );
    }
    
    public void savePracticeSession(Integer totalQuestions, Integer correctAnswers) {
        PracticeSession session = new PracticeSession(totalQuestions, correctAnswers);
        practiceSessionRepository.save(session);
    }
    
    public List<PracticeSession> getRecentSessions(int days) {
        LocalDateTime startDate = LocalDateTime.now().minusDays(days);
        return practiceSessionRepository.findRecentSessions(startDate);
    }
    
    public Double getAverageScore() {
        return practiceSessionRepository.findAverageScore();
    }
}

