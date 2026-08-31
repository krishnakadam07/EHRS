package com.EHRS.config; // Or package com.EHRS; if you put it in the root folder

import com.EHRS.entity.Role;
import com.EHRS.entity.User;
import com.EHRS.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Check if our Master Admin already exists in the users table
            if (userRepository.findByEmail("krishnak2708@gmail.com").isEmpty()) {
                User adminUser = new User();
                adminUser.setEmail("krishnak2708@gmail.com");

                // Hash the password so AuthService can read it
                adminUser.setPassword(passwordEncoder.encode("ADMIN2026"));

                // Set the role to ADMIN
                adminUser.setRole(Role.ADMIN);

                userRepository.save(adminUser);
                System.out.println("✅ MASTER ADMIN SUCCESSFULLY CREATED: krishnak2708@gmail.com / ADMIN2026");
            }
        };
    }
}