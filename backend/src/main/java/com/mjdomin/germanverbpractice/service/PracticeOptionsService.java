package com.mjdomin.germanverbpractice.service;

import com.mjdomin.germanverbpractice.model.Verb;
import com.mjdomin.germanverbpractice.model.GrammaticalCase;
import com.mjdomin.germanverbpractice.repository.VerbRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PracticeOptionsService {
    @Autowired
    private VerbRepository verbRepository;

    public Map<String, Object> getOptionsForVerb(Long verbId) {
        Verb verb = verbRepository.findById(verbId).orElse(null);
        if (verb == null) return Collections.emptyMap();
        List<Verb> allVerbs = verbRepository.findAll();
        // Preposition options
        Set<String> preps = allVerbs.stream().map(Verb::getPreposition).collect(Collectors.toSet());
        List<String> prepositionOptions = getRandomOptions(preps, verb.getPreposition());
        // Meaning options
        Set<String> meanings = allVerbs.stream().map(Verb::getMeaning).collect(Collectors.toSet());
        List<String> meaningOptions = getRandomOptions(meanings, verb.getMeaning());
        // Case options
        List<String> caseOptions = getRandomOptions(Arrays.asList("AKKUSATIV", "DATIV"), verb.getGrammaticalCase().name());
        Map<String, Object> result = new HashMap<>();
        result.put("prepositions", prepositionOptions);
        result.put("meanings", meaningOptions);
        result.put("cases", caseOptions);
        return result;
    }

    private List<String> getRandomOptions(Collection<String> all, String correct) {
        List<String> options = new ArrayList<>(all);
        options.remove(correct);
        Collections.shuffle(options);
        List<String> result = options.stream().limit(3).collect(Collectors.toList());
        result.add(correct);
        Collections.shuffle(result);
        return result;
    }
}
