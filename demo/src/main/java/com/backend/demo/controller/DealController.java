package com.backend.demo.controller;//import com.backend.demo.dto.DealDTO;
import com.backend.demo.entity.Deal;
import com.backend.demo.entity.Startup;
import com.backend.demo.repository.CompanyRepository;
import com.backend.demo.repository.DealRepository;
import com.backend.demo.repository.StartupRepository;
import com.backend.demo.service.DealService;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController

public class DealController {
    private final DealService dealService;
    private final DealRepository dealRepository;

    public DealController(DealService dealService, DealRepository dealRepository) {
        this.dealService = dealService;
        this.dealRepository = dealRepository;
    }

    // 딜 추가 API
    @PostMapping("/api/member/adddeals")
    public ResponseEntity<Deal> addDeal(@RequestBody Deal deal) {
        try{
            Deal savedDeal = dealService.createDeal(deal);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedDeal);
        } catch(IllegalArgumentException e){
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }
    }

    //딜 삭제 API
    @DeleteMapping("/api/deals")
    public ResponseEntity<Deal> deleteDeals(@RequestBody Map<String,List<Integer>> request) {

        try {
            //삭제할 딜 목록의 ID에 해당하는 Deal 삭제
            List<Integer> ids = request.get("ids"); //ids 필드에서 배열을 추출.
            dealRepository.deleteAllById(ids); //id 목록에 해당하는 모든 Deal 삭제
            return ResponseEntity.ok().build(); //삭제 성공
        }catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 오류 처리.
        }
    }

    // 모든 딜 조회
    @GetMapping("/api/deals")
    public List<Deal> getAllDeals() {
       return dealRepository.findAll();
    }

    //검토상태 수정 API
    @PutMapping("/api/member/deals/{id}")
    public ResponseEntity<Deal> updateDealStatus(@PathVariable("id") Integer id, @RequestBody Deal updatedDeal) {
        //deal 엔티티에서 id로 찾고.
        //System.out.println("id = " + id);
        //System.out.println("updatedDeal.getStatus() = " + updatedDeal.getStatus());
        dealService.update(id, updatedDeal.getStatus());
        Deal deal = dealService.findOne(id);

        return ResponseEntity.ok(deal);
    }




    
}