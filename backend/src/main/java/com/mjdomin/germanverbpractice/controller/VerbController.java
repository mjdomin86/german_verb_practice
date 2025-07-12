package com.mjdomin.germanverbpractice.controller;

import com.mjdomin.germanverbpractice.dto.VerbDTO;
import com.mjdomin.germanverbpractice.service.VerbService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/verbs")
@CrossOrigin(origins = "http://localhost:3000")
public class VerbController {
    
    @Autowired
    private VerbService verbService;
    
    @GetMapping
    public ResponseEntity<List<VerbDTO>> getAllVerbs() {
        List<VerbDTO> verbs = verbService.getAllVerbs();
        return ResponseEntity.ok(verbs);
    }
    
    @GetMapping("/random")
    public ResponseEntity<List<VerbDTO>> getAllVerbsRandomized() {
        List<VerbDTO> verbs = verbService.getAllVerbsRandomized();
        return ResponseEntity.ok(verbs);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<VerbDTO> getVerbById(@PathVariable Long id) {
        return verbService.getVerbById(id)
                .map(verb -> ResponseEntity.ok(verb))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<VerbDTO> createVerb(@Valid @RequestBody VerbDTO verbDTO) {
        try {
            VerbDTO createdVerb = verbService.createVerb(verbDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdVerb);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<VerbDTO> updateVerb(@PathVariable Long id, @Valid @RequestBody VerbDTO verbDTO) {
        try {
            VerbDTO updatedVerb = verbService.updateVerb(id, verbDTO);
            return ResponseEntity.ok(updatedVerb);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVerb(@PathVariable Long id) {
        try {
            verbService.deleteVerb(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

