package com.backend.demo.controller;

import com.backend.demo.entity.Deal;
import com.backend.demo.entity.Startup;
import com.backend.demo.repository.CompanyRepository;
import com.backend.demo.repository.DealRepository;
import com.backend.demo.repository.StartupRepository;
import com.backend.demo.service.DealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController

public class DealController {
    private final DealService dealService;

    public DealController(DealService dealService) {
        this.dealService = dealService;
    }

    // 딜 추가
    @PostMapping("/api/member/adddeals")
    public ResponseEntity<Deal> addDeal(@RequestBody Deal deal) {
        if(deal.getStartup() == null || deal.getStartup().getName() == null){
            return ResponseEntity.badRequest().body(null);
        }
        Deal savedDeal = dealService.createDeal(deal);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedDeal);
    }

    // 모든 딜 조회
    @GetMapping("/api/deals")
    public ResponseEntity<List<Deal>> getAllDeals() {
        List<Deal> deals = dealService.getAllDeals();
        return ResponseEntity.ok(deals);
    }
}