package com.mjdomin.germanverbpractice.service;

import com.mjdomin.germanverbpractice.model.Verb;
import com.mjdomin.germanverbpractice.model.GrammaticalCase;
import com.mjdomin.germanverbpractice.repository.VerbRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Service
public class VerbCsvImportService {
    @Autowired
    private VerbRepository verbRepository;

    public void importVerbsFromCsv(MultipartFile file) throws Exception {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] columns = line.split(",");
                if (columns.length < 4) continue;
                String verb = columns[0].trim();
                String preposition = columns[1].trim();
                String grammaticalCase = columns[2].trim().toUpperCase();
                String meaning = columns[3].trim();
                GrammaticalCase gCase = grammaticalCase.equals("AKKUSATIV") ? GrammaticalCase.AKKUSATIV : GrammaticalCase.DATIV;
                Verb v = new Verb();
                v.setVerb(verb);
                v.setPreposition(preposition);
                v.setGrammaticalCase(gCase);
                v.setMeaning(meaning);
                verbRepository.save(v);
            }
        }
    }
}
