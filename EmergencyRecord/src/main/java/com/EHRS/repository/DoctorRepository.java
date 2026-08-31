package com.EHRS.repository;
import com.EHRS.entity.Doctor;
import com.EHRS.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByUser(User user);
    List<Doctor> findByIsVerified(boolean isVerified);

}