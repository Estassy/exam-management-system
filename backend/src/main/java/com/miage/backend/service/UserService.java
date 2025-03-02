package com.miage.backend.service;

import com.miage.backend.entity.User;
import com.miage.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createUser(String username, String password, String role) {
        String encodedPassword = passwordEncoder.encode(password);
        User user = new User(username, encodedPassword, role);
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(UUID id) {
        return userRepository.findById(id);
    }

    public User updateUser(UUID id, String username, String password, String role) {
        return userRepository.findById(id).map(existingUser -> {
            existingUser.setUsername(username);
            if (password != null && !password.isEmpty()) {
                existingUser.setPassword(passwordEncoder.encode(password));
            }
            existingUser.setRole(role);
            return userRepository.save(existingUser);
        }).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }

    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }
}
