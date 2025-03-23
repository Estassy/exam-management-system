package com.miage.backend.service;

import com.miage.backend.entity.User;
import com.miage.backend.enums.Role;
import com.miage.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createUser() {
        User user = new User("testuser", "password", Role.STUDENT);
        when(userRepository.save(any(User.class))).thenReturn(user);

        User createdUser = userService.createUser("testuser", "password", Role.STUDENT, "First", "Last", null);
        assertNotNull(createdUser);
        assertEquals("testuser", createdUser.getUsername());
        assertEquals(Role.STUDENT, createdUser.getRole());
    }

    @Test
    void getAllUsers() {
        // Add your test implementation here
    }

    @Test
    void getUserById() {
        UUID userId = UUID.randomUUID();
        User user = new User("testuser", "password", Role.STUDENT);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        Optional<User> foundUser = userService.getUserById(userId);

        assertTrue(foundUser.isPresent());
        assertEquals("testuser", foundUser.get().getUsername());
    }

    @Test
    void updateUser() {
        // Add your test implementation here
    }

    @Test
    void deleteUser() {
        UUID userId = UUID.randomUUID();
        User user = new User("testuser", "password", Role.STUDENT);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        userService.deleteUser(userId);

        verify(userRepository, times(1)).deleteById(userId);
    }

    @Test
    void getUserByUsername() {
        String username = "testuser";
        User user = new User(username, "password", Role.STUDENT);
        when(userRepository.findByUsername(username)).thenReturn(user);

        User foundUser = userService.getUserByUsername(username);

        assertNotNull(foundUser);
        assertEquals(username, foundUser.getUsername());
    }
}