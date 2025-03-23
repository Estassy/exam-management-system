package com.miage.backend.service;

    import com.miage.backend.entity.User;
    import com.miage.backend.enums.Role;
    import com.miage.backend.repository.UserRepository;
    import org.junit.jupiter.api.BeforeEach;
    import org.junit.jupiter.api.Test;
    import org.mockito.InjectMocks;
    import org.mockito.Mock;
    import org.mockito.MockitoAnnotations;
    import org.springframework.security.core.userdetails.UserDetails;
    import org.springframework.security.core.userdetails.UsernameNotFoundException;
    import org.springframework.security.crypto.password.PasswordEncoder;

    import static org.junit.jupiter.api.Assertions.*;
    import static org.mockito.Mockito.*;

    class CustomUserDetailsServiceTest {

        @Mock
        private UserRepository userRepository;

        @Mock
        private PasswordEncoder passwordEncoder;

        @InjectMocks
        private CustomUserDetailsService customUserDetailsService;

        @BeforeEach
        void setUp() {
            MockitoAnnotations.openMocks(this);
        }

        @Test
        void loadUserByUsername_UserExists() {
            User user = new User();
            user.setUsername("testuser");
            user.setPassword("password");
            user.setRole(Role.valueOf("ADMIN"));

            when(userRepository.findByUsername("testuser")).thenReturn(user);
            when(passwordEncoder.encode("password")).thenReturn("$2a$10$encodedpassword");

            UserDetails userDetails = customUserDetailsService.loadUserByUsername("testuser");

            assertNotNull(userDetails);
            assertEquals("testuser", userDetails.getUsername());
            assertEquals("$2a$10$encodedpassword", userDetails.getPassword());
            assertTrue(userDetails.getAuthorities().stream()
                    .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN")));
        }

        @Test
        void loadUserByUsername_UserNotFound() {
            when(userRepository.findByUsername("unknownuser")).thenReturn(null);

            assertThrows(UsernameNotFoundException.class, () -> {
                customUserDetailsService.loadUserByUsername("unknownuser");
            });
        }
    }