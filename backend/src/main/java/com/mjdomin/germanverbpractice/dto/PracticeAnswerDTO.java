package com.mjdomin.germanverbpractice.dto;

import com.mjdomin.germanverbpractice.model.GrammaticalCase;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class PracticeAnswerDTO {
    @NotNull(message = "Verb ID is required")
    private Long verbId;
    
    @NotBlank(message = "Selected preposition is required")
    private String selectedPreposition;
    
    @NotBlank(message = "Selected meaning is required")
    private String selectedMeaning;
    
    @NotNull(message = "Selected case is required")
    private GrammaticalCase selectedCase;
    
    // Constructors
    public PracticeAnswerDTO() {}
    
    public PracticeAnswerDTO(Long verbId, String selectedPreposition, String selectedMeaning, GrammaticalCase selectedCase) {
        this.verbId = verbId;
        this.selectedPreposition = selectedPreposition;
        this.selectedMeaning = selectedMeaning;
        this.selectedCase = selectedCase;
    }
    
    // Getters and Setters
    public Long getVerbId() { return verbId; }
    public void setVerbId(Long verbId) { this.verbId = verbId; }
    
    public String getSelectedPreposition() { return selectedPreposition; }
    public void setSelectedPreposition(String selectedPreposition) { this.selectedPreposition = selectedPreposition; }
    
    public String getSelectedMeaning() { return selectedMeaning; }
    public void setSelectedMeaning(String selectedMeaning) { this.selectedMeaning = selectedMeaning; }
    
    public GrammaticalCase getSelectedCase() { return selectedCase; }
    public void setSelectedCase(GrammaticalCase selectedCase) { this.selectedCase = selectedCase; }
}
