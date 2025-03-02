package com.example.demo.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.client.RestTemplate;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class JokeController {

    private static final Logger logger = LoggerFactory.getLogger(JokeController.class);

    @GetMapping("/joke")
    public Map<String, Object> getJoke() {
        logger.info("📢 JokeController was called! Fetching a joke...");

        RestTemplate restTemplate = new RestTemplate();
        String jokeApiUrl = "https://official-joke-api.appspot.com/random_joke";
        Map<String, Object> joke = restTemplate.getForObject(jokeApiUrl, Map.class);

        logger.info("✅ Successfully fetched joke: {}", joke);
        return joke;
    }
}

// @RestController
// @RequestMapping("/api")
// public class JokeController {

//     @GetMapping("/joke")
//     public Map<String, Object> getJoke() {
//         RestTemplate restTemplate = new RestTemplate();
//         String jokeApiUrl = "https://official-joke-api.appspot.com/random_joke";
//         return restTemplate.getForObject(jokeApiUrl, Map.class);
//     }
// }