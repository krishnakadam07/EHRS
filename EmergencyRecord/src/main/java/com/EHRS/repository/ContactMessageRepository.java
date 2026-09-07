package com.EHRS.repository;

import com.EHRS.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    // Allows Admin to fetch only the Unread notifications
    List<ContactMessage> findByStatus(String status);
}