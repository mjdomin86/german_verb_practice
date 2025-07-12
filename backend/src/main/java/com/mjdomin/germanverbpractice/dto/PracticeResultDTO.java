package com.mjdomin.germanverbpractice.dto;

public class PracticeResultDTO {
    private boolean correct;
    private boolean prepositionCorrect;
    private boolean meaningCorrect;
    private boolean caseCorrect;
    private VerbDTO correctAnswer;
    
    // Constructors
    public PracticeResultDTO() {}
    
    public PracticeResultDTO(boolean correct, boolean prepositionCorrect, boolean meaningCorrect, 
                           boolean caseCorrect, VerbDTO correctAnswer) {
        this.correct = correct;
        this.prepositionCorrect = prepositionCorrect;
        this.meaningCorrect = meaningCorrect;
        this.caseCorrect = caseCorrect;
        this.correctAnswer = correctAnswer;
    }
    
    // Getters and Setters
    public boolean isCorrect() { return correct; }
    public void setCorrect(boolean correct) { this.correct = correct; }
    
    public boolean isPrepositionCorrect() { return prepositionCorrect; }
    public void setPrepositionCorrect(boolean prepositionCorrect) { this.prepositionCorrect = prepositionCorrect; }
    
    public boolean isMeaningCorrect() { return meaningCorrect; }
    public void setMeaningCorrect(boolean meaningCorrect) { this.meaningCorrect = meaningCorrect; }
    
    public boolean isCaseCorrect() { return caseCorrect; }
    public void setCaseCorrect(boolean caseCorrect) { this.caseCorrect = caseCorrect; }
    
    public VerbDTO getCorrectAnswer() { return correctAnswer; }
    public void setCorrectAnswer(VerbDTO correctAnswer) { this.correctAnswer = correctAnswer; }
}
