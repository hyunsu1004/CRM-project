package com.backend.demo.repository;

import com.backend.demo.entity.DealNote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DealNoteRepository extends JpaRepository<DealNote, Integer> {

    //특정 Deal ID에 해당하는 모든 Deal Note를 가져오는 메서드.
    List<DealNote> findByDealId(Integer dealId);
}
