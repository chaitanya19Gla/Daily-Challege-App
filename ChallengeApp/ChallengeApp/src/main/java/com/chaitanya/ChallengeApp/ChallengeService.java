package com.chaitanya.ChallengeApp;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
@Service
public class ChallengeService {
    private List<Challenge> challenges = new ArrayList<>();
    private long id = 1L;
//    @GetMapping("/challenges")
    public List<Challenge> getChallenges(){
        return challenges;
    }
//    @PostMapping("/challenges")
    public boolean addChallenge( Challenge challenge){
        challenge.setId(id++);
        if (challenge!=null){
            challenges.add(challenge);
            return true;
        }
        else {
            return false;
        }
    }
    public Challenge getChallenge(String month){
        for (Challenge challenge : challenges){
            if (challenge.getMonth().equals(month)){
                return challenge;
            }
        }
        return null;
    }

    public boolean deleteChallenge(Long id){
        if(challenges.removeIf(challenge -> challenge.getId()==id)){
            System.out.println("Successfully removed");
            return true;
        }
        return false;
    }
}
