package com.backend.demo.repository;

import com.backend.demo.entity.value.StringValue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StringValueRepository extends JpaRepository<StringValue, Long> {
}
