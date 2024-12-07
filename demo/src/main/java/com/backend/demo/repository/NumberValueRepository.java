package com.backend.demo.repository;

import com.backend.demo.entity.value.NumberValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

@Repository
public interface NumberValueRepository extends JpaRepository<NumberValue, Long> {
}
