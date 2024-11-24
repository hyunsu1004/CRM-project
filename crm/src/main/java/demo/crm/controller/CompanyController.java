package demo.crm.controller;


import demo.crm.entity.Startup;
import demo.crm.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company")
@CrossOrigin(origins = "http://localhost:3000") //react 앱이 실행되는 주소
public class CompanyController {

    @Autowired
    private CompanyRepository companyRepository;

    //데이터 조회
    @GetMapping
    public List<Startup> getAllCompanies(){
        return companyRepository.findAll();
    }

    //데이터 저장
    @PostMapping
    public List<Startup> saveAllCompanies(@RequestBody List<Startup> companies){
        return companyRepository.saveAll(companies);
    }
}
