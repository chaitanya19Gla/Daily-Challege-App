package com.chaitanya.ChallengeApp;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


//HAME BATANA PAFEGA POSTMAN KO KI YE CLASS CONTROLLER HAI ISLYE BELOW ANOTATION USE KARI GAYI HAI
@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class ChallengeController {
    private ChallengeService challengeService;
    public ChallengeController(ChallengeService challengeService){
        this.challengeService=challengeService;
    }
    @GetMapping("/challenges")
    public List<Challenge> getChallenges(){
        return challengeService.getChallenges();
    }
    @PostMapping("/challenges")
    public String addChallenge(@RequestBody Challenge challenge){
        boolean isChallengeAdded = challengeService.addChallenge(challenge);
        if (isChallengeAdded) {
            return "Your Challenge is ready to tackled";
        }
        else {
            return "Not Added";
        }
    }
    @GetMapping("/challenges/{month}")
    public Challenge getChallenge(@PathVariable String month){
        return challengeService.getChallenge(month);
    }
    @DeleteMapping("/challenges/{id}")
    public boolean deleteChallenge(@PathVariable Long id){
        return challengeService.deleteChallenge(id);
    }
}
