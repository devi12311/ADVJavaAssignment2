package com.example.theatre.controllers;

import com.example.theatre.entity.UserEntity;
import com.example.theatre.models.LoginCredentials;
import com.example.theatre.repository.UserRepo;
import com.example.theatre.security.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.Map;

@RestController // Marks the class a rest controller
@RequestMapping("/api/auth") // Requests made to /api/auth/anything will be handles by this class
@CrossOrigin
public class AuthController {

    // Injecting Dependencies
    @Autowired private UserRepo userRepo;
    @Autowired private JWTUtil jwtUtil;
    @Autowired private AuthenticationManager authManager;
    @Autowired private PasswordEncoder passwordEncoder;

    // Defining the function to handle the POST route for registering a user
    @PostMapping("/register")
    public Map<String, Object> registerHandler(@RequestBody UserEntity userEntity){
        // Encoding Password using Bcrypt
        String encodedPass = passwordEncoder.encode(userEntity.getPassword());

        // Setting the encoded password
        userEntity.setPassword(encodedPass);

        // Persisting the User Entity to H2 Database
        userEntity = userRepo.save(userEntity);
        userRepo.save(userEntity);

        // Generating JWT
        String token = jwtUtil.generateToken(userEntity.getEmail());

        // Responding with JWT
        return Collections.singletonMap("jwt-token", token);
    }

    // Defining the function to handle the POST route for logging in a user
    @PostMapping("/login")
    public Map<String, Object> loginHandler(@RequestBody LoginCredentials body){
        try {
            // Creating the Authentication Token which will contain the credentials for authenticating
            // This token is used as input to the authentication process
            UsernamePasswordAuthenticationToken authInputToken =
                    new UsernamePasswordAuthenticationToken(body.getEmail(), body.getPassword());

            if (!userRepo.existsByEmail(body.getEmail())){
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            }

            // Authenticating the Login Credentials
            authManager.authenticate(authInputToken);

            // If this point is reached it means Authentication was successful
            // Generate the JWT
            String token = jwtUtil.generateToken(body.getEmail());

            // Respond with the JWT
            return Collections.singletonMap("jwt-token", token);
        }catch (AuthenticationException authExc){
            // Auhentication Failed
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
    }


}
