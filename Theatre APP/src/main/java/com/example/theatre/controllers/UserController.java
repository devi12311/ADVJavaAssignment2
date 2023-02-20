package com.example.theatre.controllers;

import com.example.theatre.entity.UserEntity;
import com.example.theatre.models.UserUpdate;
import com.example.theatre.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController // Marks the class a rest controller
@RequestMapping("/api/user") // Requests made to /api/auth/anything will be handles by this class
@CrossOrigin
public class UserController {

    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepo;

    @Autowired
    public UserController(PasswordEncoder passwordEncoder, UserRepo userRepo) {
        this.passwordEncoder = passwordEncoder;
        this.userRepo = userRepo;
    }


    // Defining the function to handle the GET route to fetch user information of the authenticated user
    @GetMapping("/info")
    public UserEntity getUserDetails(){
        // Retrieve email from the Security Context
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        // Fetch and return user details
        return userRepo.findByEmail(email).get();
    }

    @PutMapping("/update")
    public UserEntity updateUser(@RequestBody UserUpdate update){
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserEntity entity = userRepo.findByEmail(email).get();
        entity.setFirstName(update.getFirstName());
        entity.setEmail(update.getEmail());
        if (update.getPassword() != null) {
            entity.setPassword(passwordEncoder.encode(update.getPassword()));
        }
        entity.setLastName(update.getLastName());

        return userRepo.save(entity);
    }
}
