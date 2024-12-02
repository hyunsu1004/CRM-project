package com.backend.demo.service;

import com.backend.demo.entity.Deal;
import com.backend.demo.entity.DealStatus;
import com.backend.demo.entity.Note;
import com.backend.demo.entity.Startup;
import com.backend.demo.repository.DealRepository;
import com.backend.demo.repository.NoteRepository;
import com.backend.demo.repository.StartupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DealService {
    @Autowired
    private final DealRepository dealRepository;
    @Autowired
    private final StartupRepository startupRepository;
    @Autowired
    private NoteRepository noteRepository;

    public DealService(DealRepository dealRepository, StartupRepository startupRepository) {
        this.dealRepository = dealRepository;
        this.startupRepository = startupRepository;
    }

    public Deal createDeal(Deal deal) {
        // Startup 존재 여부 확인
        Optional<Startup> existingStartup = startupRepository.findByName(deal.getStartup().getName());

        if(deal.getStartup() == null || deal.getStartup().getName() == null) {
            //예외처리 : startup이 아니면 null이면 처리
            throw new IllegalArgumentException("Startup 정보가 필요합니다.");
        }

        Startup startup = existingStartup.orElseGet(() -> {
            Startup newStartup = new Startup();
            newStartup.setName(deal.getStartup().getName());
            return startupRepository.save(newStartup);
        });

        deal.setStartup(startup);
        deal.setCreateTime(new Date()); // 생성 시간 설정
        deal.setStatus(DealStatus.PENDING); // 기본 상태 설정

        return dealRepository.save(deal);
    }


    public List<Deal> getAllDeals() {
        return dealRepository.findAll();
    }

    public Note addNoteToDeal(Long dealId, String content) {
        Deal deal = dealRepository.findById(dealId)
                .orElseThrow(() -> new IllegalArgumentException("Deal not found"));
        Note note = new Note();
        note.setContent(content);

        deal.addNote(note);
        return noteRepository.save(note);
    }
}