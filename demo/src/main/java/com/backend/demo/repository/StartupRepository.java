package com.backend.demo.repository;


import com.backend.demo.entity.Startup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StartupRepository extends JpaRepository<Startup, Long> {
    Optional<Startup> findByName(String name);
}
