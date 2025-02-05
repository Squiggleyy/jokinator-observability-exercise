package com.example.demo.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class JokeController {

    @GetMapping("/joke")
    public Map<String, Object> getJoke() {
        RestTemplate restTemplate = new RestTemplate();
        String jokeApiUrl = "https://official-joke-api.appspot.com/random_joke";
        return restTemplate.getForObject(jokeApiUrl, Map.class);
    }
}