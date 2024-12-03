package com.backend.demo.service;

import com.backend.demo.entity.Deal;
import com.backend.demo.entity.DealStatus;
import com.backend.demo.entity.Startup;
import com.backend.demo.repository.DealRepository;
import com.backend.demo.repository.StartupRepository;
import org.hibernate.sql.ast.tree.expression.Star;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DealService {
    @Autowired
    private final DealRepository dealRepository;
    @Autowired
    private final StartupRepository startupRepository;

    public DealService(DealRepository dealRepository, StartupRepository startupRepository) {
        this.dealRepository = dealRepository;
        this.startupRepository = startupRepository;
    }
    //딜 생성 기능.
    public Deal createDeal(Deal deal) {
        // Startup 존재 여부 확인
        if(deal.getStartup() == null || deal.getStartup().getName() == null) {
            //예외처리 : startup이 아니면 null이면 처리
            System.out.println("Startup: " + deal.getStartup());
            System.out.println("Startup Name: " + (deal.getStartup() != null ? deal.getStartup().getName() : "null"));
            throw new IllegalArgumentException("해당 스타트업의 이름 정보가 필요합니다.");
        }

        String startupName = deal.getStartup().getName();
        Optional<Startup> existingStartup = startupRepository.findByName(startupName);

        Startup startup = existingStartup.orElseGet(() -> {
            Startup newStartup = new Startup();
            newStartup.setName(startupName);
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

    public Deal findOne(Integer dealId) {
        return dealRepository.findById(dealId).orElse(null);
    }

    @Transactional
    public void update(Integer id, DealStatus status) {

        Deal deal = dealRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("딜이 발견되지 않음."));
        deal.setStatus(status);
        dealRepository.save(deal);
    }
}
