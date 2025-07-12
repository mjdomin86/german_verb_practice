package com.mjdomin.germanverbpractice.repository;

import com.mjdomin.germanverbpractice.model.Verb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VerbRepository extends JpaRepository<Verb, Long> {
    @Query("SELECT v FROM Verb v ORDER BY RANDOM()")
    List<Verb> findAllRandomized();
    
    boolean existsByVerbAndPreposition(String verb, String preposition);
}
