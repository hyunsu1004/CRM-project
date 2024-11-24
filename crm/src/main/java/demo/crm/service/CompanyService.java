package demo.crm.service;


import demo.crm.entity.Startup;
import demo.crm.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {
    private final CompanyRepository companyRepository;

    @Autowired
    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public List<Startup> getAllCompanies() {
        return companyRepository.findAll();
    }

    public void saveCompany(List<Startup> companies){
        companyRepository.saveAll(companies);
    }
}
