package com.backend.demo.repository;

import com.backend.demo.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Boolean existsByEmail(String email);
    Optional<Member> findByEmail(String email);
    Member findById(long id);

}
