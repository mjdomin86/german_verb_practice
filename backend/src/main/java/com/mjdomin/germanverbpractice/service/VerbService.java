package com.mjdomin.germanverbpractice.service;

import com.mjdomin.germanverbpractice.dto.VerbDTO;
import com.mjdomin.germanverbpractice.model.Verb;
import com.mjdomin.germanverbpractice.repository.VerbRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VerbService {
    
    @Autowired
    private VerbRepository verbRepository;
    
    public List<VerbDTO> getAllVerbs() {
        return verbRepository.findAll().stream()
                .map(this::convertToDTO)
                .toList();
    }
    
    public List<VerbDTO> getAllVerbsRandomized() {
        return verbRepository.findAllRandomized().stream()
                .map(this::convertToDTO)
                .toList();
    }
    
    public Optional<VerbDTO> getVerbById(Long id) {
        return verbRepository.findById(id)
                .map(this::convertToDTO);
    }
    
    public VerbDTO createVerb(VerbDTO verbDTO) {
        if (verbRepository.existsByVerbAndPreposition(verbDTO.getVerb(), verbDTO.getPreposition())) {
            throw new IllegalArgumentException("Verb with this preposition already exists");
        }
        
        Verb verb = convertToEntity(verbDTO);
        Verb savedVerb = verbRepository.save(verb);
        return convertToDTO(savedVerb);
    }
    
    public VerbDTO updateVerb(Long id, VerbDTO verbDTO) {
        Verb verb = verbRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Verb not found"));
        
        verb.setVerb(verbDTO.getVerb());
        verb.setPreposition(verbDTO.getPreposition());
        verb.setMeaning(verbDTO.getMeaning());
        verb.setGrammaticalCase(verbDTO.getGrammaticalCase());
        
        Verb updatedVerb = verbRepository.save(verb);
        return convertToDTO(updatedVerb);
    }
    
    public void deleteVerb(Long id) {
        if (!verbRepository.existsById(id)) {
            throw new IllegalArgumentException("Verb not found");
        }
        verbRepository.deleteById(id);
    }
    
    private VerbDTO convertToDTO(Verb verb) {
        return new VerbDTO(
                verb.getId(),
                verb.getVerb(),
                verb.getPreposition(),
                verb.getMeaning(),
                verb.getGrammaticalCase()
        );
    }
    
    private Verb convertToEntity(VerbDTO verbDTO) {
        return new Verb(
                verbDTO.getVerb(),
                verbDTO.getPreposition(),
                verbDTO.getMeaning(),
                verbDTO.getGrammaticalCase()
        );
    }
}
