package com.examsphere.backend.service;

import com.examsphere.backend.config.JwtUtil;
import com.examsphere.backend.dto.AuthRequest;
import com.examsphere.backend.dto.AuthResponse;
import com.examsphere.backend.dto.LoginRequest;
import com.examsphere.backend.model.User;
import com.examsphere.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;

    public String register(AuthRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent())
            throw new RuntimeException("Email already registered");

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setExam(request.getExam());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("STUDENT");
        userRepository.save(user);

        return "User registered successfully";
    }

    public AuthResponse login(LoginRequest request) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
        if (optionalUser.isEmpty())
            throw new RuntimeException("User not found");

        User user = optionalUser.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword()))
            throw new RuntimeException("Invalid password");

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
        return new AuthResponse(
            token,
            user.getRole(),
            user.getId(),
            user.getFullName(),
            user.getEmail(),
            user.getPhone(),
            user.getExam()
        );
    }
}


// package com.examsphere.backend.service;

// import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// import com.examsphere.backend.config.JwtUtil;
// import com.examsphere.backend.dto.AuthRequest;
// import com.examsphere.backend.dto.LoginRequest;
// import com.examsphere.backend.model.User;
// import com.examsphere.backend.repository.UserRepository;

// @Service
// public class AuthService {

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private PasswordEncoder passwordEncoder;

//     @Autowired
//     private JwtUtil jwtUtil;

//     public String register(AuthRequest request) {

//         // check if email already exists
//         if (userRepository.findByEmail(request.getEmail()).isPresent()) {
//             throw new RuntimeException("Email already registered");
//         }

//         // create new user
//         User user = new User();
//         user.setFullName(request.getFullName());
//         user.setEmail(request.getEmail());
//         user.setPhone(request.getPhone());
//         user.setExam(request.getExam());
//         user.setPassword(passwordEncoder.encode(request.getPassword()));
//         user.setRole("STUDENT");

//         userRepository.save(user);

//         return "User registered successfully";
//     }

//     public String login(LoginRequest request) {

//         Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

//         if (optionalUser.isEmpty())
//             throw new RuntimeException("User not found");

//         User user = optionalUser.get();

//         // password check
//         if (!passwordEncoder.matches(request.getPassword(), user.getPassword()))
//             throw new RuntimeException("Invalid Password");

//         // generate JWT token
//         return jwtUtil.generateToken(user.getEmail());
//     }
// }
