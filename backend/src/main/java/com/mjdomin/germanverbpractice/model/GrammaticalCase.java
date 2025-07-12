package com.mjdomin.germanverbpractice.model;

public enum GrammaticalCase {
    AKKUSATIV("Akkusativ"),
    DATIV("Dativ");
    
    private final String displayName;
    
    GrammaticalCase(String displayName) {
        this.displayName = displayName;
    }
    
    public String getDisplayName() {
        return displayName;
    }
}