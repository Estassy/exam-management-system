package com.miage.backend.service;

import com.miage.backend.entity.User;
import com.miage.backend.exception.ResourceNotFoundException;
import com.miage.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createUser(User user) {
        // Encodage du mot de passe pour plus de sécurité
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User updateUser(UUID id, User updatedUser) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé pour l'ID: " + id));
        user.setUsername(updatedUser.getUsername());
        user.setRole(updatedUser.getRole());
        // Vous pouvez mettre à jour d'autres champs si nécessaire
        return userRepository.save(user);
    }

    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getUsersByRole(String role) {
        return userRepository.findByRole(role);
    }

    public User getUserById(UUID id) {
        return userRepository.findById(id).orElse(null);
    }
}

