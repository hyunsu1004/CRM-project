package com.backend.demo.repository;

import com.backend.demo.entity.Startup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompanyRepository extends JpaRepository<Startup,Long> {
    List<Startup> findByInterest(boolean interest); //조건에 맞는 여러 startup을 반환.
}
