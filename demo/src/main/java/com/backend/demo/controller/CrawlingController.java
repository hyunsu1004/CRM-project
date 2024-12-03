package com.backend.demo.controller;

import com.backend.demo.service.crawlingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CrawlingController {
    @Autowired
    private crawlingService service;

    @GetMapping("/crawl")
    public String crawlData() {
        service.crawlAndSave();
        return "TheVc 데이터의 1~10번 스타트업을 크롤링하여 저장 완료되었습니다!.";
    }
    @GetMapping("/investors")
    public String Investors() {
        service.investorsCrawlAndSave();
        return "TheVc 데이터의 1~10번 투자자를 크롤링하여 저장 완료했습니다.";
    }
}
