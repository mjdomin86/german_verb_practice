package com.mjdomin.germanverbpractice.controller;

import com.mjdomin.germanverbpractice.service.PracticeOptionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/practice/options")
public class PracticeOptionsController {
    @Autowired
    private PracticeOptionsService practiceOptionsService;

    @GetMapping("/{verbId}")
    public Map<String, Object> getOptions(@PathVariable Long verbId) {
        return practiceOptionsService.getOptionsForVerb(verbId);
    }
}
