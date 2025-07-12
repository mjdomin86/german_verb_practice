package com.mjdomin.germanverbpractice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "verbs")
public class Verb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Verb is required")
    @Column(nullable = false)
    private String verb;
    
    @NotBlank(message = "Preposition is required")
    @Column(nullable = false)
    private String preposition;
    
    @NotBlank(message = "Meaning is required")
    @Column(nullable = false)
    private String meaning;
    
    @NotNull(message = "Case is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GrammaticalCase grammaticalCase;
    
    // Constructors
    public Verb() {}
    
    public Verb(String verb, String preposition, String meaning, GrammaticalCase grammaticalCase) {
        this.verb = verb;
        this.preposition = preposition;
        this.meaning = meaning;
        this.grammaticalCase = grammaticalCase;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getVerb() { return verb; }
    public void setVerb(String verb) { this.verb = verb; }
    
    public String getPreposition() { return preposition; }
    public void setPreposition(String preposition) { this.preposition = preposition; }
    
    public String getMeaning() { return meaning; }
    public void setMeaning(String meaning) { this.meaning = meaning; }
    
    public GrammaticalCase getGrammaticalCase() { return grammaticalCase; }
    public void setGrammaticalCase(GrammaticalCase grammaticalCase) { this.grammaticalCase = grammaticalCase; }
}
