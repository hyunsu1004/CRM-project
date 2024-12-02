package com.backend.demo.repository;

import com.backend.demo.entity.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface DealRepository extends JpaRepository<Deal, Long> {
}