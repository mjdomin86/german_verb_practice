package com.mjdomin.germanverbpractice.controller;

import com.mjdomin.germanverbpractice.service.VerbCsvImportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/verbs/import")
public class VerbCsvImportController {
    @Autowired
    private VerbCsvImportService verbCsvImportService;

    @PostMapping
    public ResponseEntity<?> importVerbs(@RequestParam("file") MultipartFile file) {
        try {
            verbCsvImportService.importVerbsFromCsv(file);
            return ResponseEntity.ok().body("Verbs imported successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to import verbs: " + e.getMessage());
        }
    }
}
