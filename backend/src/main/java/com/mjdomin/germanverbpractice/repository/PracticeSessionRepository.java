package com.mjdomin.germanverbpractice.repository;

import com.mjdomin.germanverbpractice.model.PracticeSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PracticeSessionRepository extends JpaRepository<PracticeSession, Long> {
    @Query("SELECT p FROM PracticeSession p WHERE p.createdAt >= :startDate ORDER BY p.createdAt DESC")
    List<PracticeSession> findRecentSessions(LocalDateTime startDate);
    
    @Query("SELECT AVG(CAST(p.correctAnswers AS double) / p.totalQuestions) FROM PracticeSession p")
    Double findAverageScore();
}

