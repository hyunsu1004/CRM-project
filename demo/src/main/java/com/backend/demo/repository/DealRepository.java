package com.backend.demo.repository;

import com.backend.demo.entity.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DealRepository extends JpaRepository<Deal, Integer> {
    List<Deal> findAllByMember_Id(Integer memberId);
}
