package com.mjdomin.germanverbpractice.dto;

import com.mjdomin.germanverbpractice.model.GrammaticalCase;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class VerbDTO {
    private Long id;
    
    @NotBlank(message = "Verb is required")
    private String verb;
    
    @NotBlank(message = "Preposition is required")
    private String preposition;
    
    @NotBlank(message = "Meaning is required")
    private String meaning;
    
    @NotNull(message = "Case is required")
    private GrammaticalCase grammaticalCase;
    
    // Constructors
    public VerbDTO() {}
    
    public VerbDTO(Long id, String verb, String preposition, String meaning, GrammaticalCase grammaticalCase) {
        this.id = id;
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
