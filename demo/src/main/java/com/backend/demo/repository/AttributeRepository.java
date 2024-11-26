package com.backend.demo.repository;

import com.backend.demo.entity.Attribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RestController;

@RestController
public interface AttributeRepository extends JpaRepository<Attribute, Long> {
    boolean existsByName(String name); //속성 이름 중복 체크
}