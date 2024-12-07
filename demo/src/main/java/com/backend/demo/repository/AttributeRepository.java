package com.backend.demo.repository;

import com.backend.demo.entity.Attribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Repository
public interface AttributeRepository extends JpaRepository<Attribute, Integer> {
//    boolean existsByName(String name); //속성 이름 중복 체크
//    List<Attribute> findByDealId(Integer dealId);
}
