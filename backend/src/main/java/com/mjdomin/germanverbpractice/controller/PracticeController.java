package com.mjdomin.germanverbpractice.controller;

import com.mjdomin.germanverbpractice.dto.PracticeAnswerDTO;
import com.mjdomin.germanverbpractice.dto.PracticeResultDTO;
import com.mjdomin.germanverbpractice.model.PracticeSession;
import com.mjdomin.germanverbpractice.service.PracticeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/practice")
@CrossOrigin(origins = "http://localhost:3000")
public class PracticeController {
    
    @Autowired
    private PracticeService practiceService;
    
    @PostMapping("/check")
    public ResponseEntity<PracticeResultDTO> checkAnswer(@Valid @RequestBody PracticeAnswerDTO answerDTO) {
        try {
            PracticeResultDTO result = practiceService.checkAnswer(answerDTO);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/session")
    public ResponseEntity<Void> savePracticeSession(@RequestParam Integer totalQuestions, 
                                                   @RequestParam Integer correctAnswers) {
        practiceService.savePracticeSession(totalQuestions, correctAnswers);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/sessions")
    public ResponseEntity<List<PracticeSession>> getRecentSessions(@RequestParam(defaultValue = "7") int days) {
        List<PracticeSession> sessions = practiceService.getRecentSessions(days);
        return ResponseEntity.ok(sessions);
    }
    
    @GetMapping("/average-score")
    public ResponseEntity<Double> getAverageScore() {
        Double averageScore = practiceService.getAverageScore();
        return ResponseEntity.ok(averageScore);
    }
}

