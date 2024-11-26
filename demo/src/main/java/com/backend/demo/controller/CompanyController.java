package com.backend.demo.controller;

import com.backend.demo.entity.Investor;
import com.backend.demo.entity.Startup;
import com.backend.demo.repository.CompanyRepository;
import com.backend.demo.repository.InvestorRepository;
import com.backend.demo.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000") //react 앱이 실행되는 주소
public class CompanyController {

    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private InvestorRepository investorRepository;

    //스타트업 데이터 조회
    @GetMapping("/api/member/startups")
    public List<Startup> getAllCompanies(){
        return companyRepository.findAll();
    }

    //투자자 데이터 조회
    @GetMapping("/api/member/investors")
    public List<Investor> getAllInvestors(){ return investorRepository.findAll();}

    //데이터 저장
    @PostMapping("/api/member/startups")
    public List<Startup> saveAllCompanies(@RequestBody List<Startup> companies){
        return companyRepository.saveAll(companies);
    }
    @PostMapping("/api/member/investors")
    public List<Investor> saveAllInvestors(@RequestBody List<Investor> investors){
        return investorRepository.saveAll(investors);
    }

    //선호기업 추가 해주는 로직
    @PostMapping("/api/member/favorite")
    public List<Startup> saveInterestedCompanies(@RequestBody List<Startup> companies){
        return companyRepository.findByInterest(true);
    }
    @GetMapping("/api/member/favorite")
    public List<Startup> getInterestedCompanies() {return companyRepository.findByInterest(true);}
}
