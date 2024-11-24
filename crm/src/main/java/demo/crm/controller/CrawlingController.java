package demo.crm.controller;


import demo.crm.service.crawlingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
}
