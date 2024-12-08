package com.backend.demo.service;

import com.backend.demo.entity.Investor;
import com.backend.demo.entity.Startup;
import com.backend.demo.repository.InvestorRepository;
import com.backend.demo.repository.StartupRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.print.Doc;

@Service
public class crawlingService {

    @Autowired
    private StartupRepository startupRepository;
    @Autowired
    private InvestorRepository investorRepository;

    public void crawlAndSave() {
        try {
            String url = "https://thevc.kr/browse/startups";
            Document doc = Jsoup.connect(url).get();

            // 데이터가 테이블에 있을 것으로 예상하고, 테이블의 모든 행을 선택
            Elements rows = doc.select("table tbody tr"); // 테이블 행 선택

            // 각 행에서 데이터를 추출하여 저장
            for (Element row : rows) {
                // 각 열(td) 선택
                Elements cols = row.select("td");

                Startup startup = new Startup();

                startup.setName(cols.get(1).select(".mb-4").text());
                startup.setProductOrService(cols.get(9).select(".mb-4").text());
                startup.setTechnology(cols.get(10).select(".chip-text").text());
                startup.setCategory(cols.get(11).select(".chip-text").text());

                //총 자본금 처리
                Element totalCapitalElement = cols.get(15).selectFirst(".mb-4");
                if(totalCapitalElement != null) {
                    Element removableElement = totalCapitalElement.selectFirst(".ml-4.text-sub.text-12");
                    if(removableElement != null) {
                        removableElement.remove();
                        startup.setTotalCapital(totalCapitalElement.text().trim());
                    }
                }else{
                    startup.setTotalCapital("알 수 없음.");
                }
//                startup.setTotalCapital(totalCapitalElement.text().trim());

                startup.setTotalInvestment(cols.get(18).text());
                startup.setRecentInvestment(cols.get(19).select(".chip-text").text());
                startup.setRecentFunding(cols.get(20).text());
                startup.setKeyInvestors(cols.get(21).select(".text-underline").text());
                //데이터베이스에 저장
                startupRepository.save(startup);
                }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void investorsCrawlAndSave() {
        try {
            String url = "https://thevc.kr/browse/investors";
            Document doc = Jsoup.connect(url).get();

            // 데이터가 테이블에 있을 것으로 예상하고, 테이블의 모든 행을 선택
            Elements rows = doc.select("table tbody tr"); // 테이블 행 선택

            // 각 행에서 데이터를 추출하여 저장
            for (Element row : rows) {
                // 각 열(td) 선택
                Elements cols = row.select("td");

                Investor investor = new Investor();

                investor.setName(cols.get(1).select(".mb-4").text()); //이름
                investor.setCategory(cols.get(3).select(".chip-text").text()); //분류
                investor.setTotalCount(cols.get(7).text()); //총 투자 건수
                investor.setTotalInvestment(cols.get(8).text()); //통 추자 집행 금액
                investor.setAverageInvestment(cols.get(9).select(".mt-4").text()); //평균 투자 금액
                investor.setRecentFunding(cols.get(10).text());// 최근 투자 유치날자
                investor.setKeyCategory(cols.get(13).select(".chip-text").text());// 주요 투자 기술
                investorRepository.save(investor);

//                //총 자본금 처리
//                Element totalCapitalElement = cols.get(15).selectFirst(".mb-4");
//                if(totalCapitalElement != null) {
//                    Element removableElement = totalCapitalElement.selectFirst(".ml-4.text-sub.text-12");
//                    if(removableElement != null) {
//                        removableElement.remove();
//                    }
                }
               //startup.setTotalCapital(totalCapitalElement.text().trim());
        } catch (Exception e) {
            e.printStackTrace();
            }

    }

}

