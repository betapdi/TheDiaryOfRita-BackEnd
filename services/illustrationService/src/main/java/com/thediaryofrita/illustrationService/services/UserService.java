package com.thediaryofrita.illustrationService.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thediaryofrita.illustrationService.models.User;
import com.thediaryofrita.illustrationService.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUserById(String id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("No user by ID: " + id));
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

}
