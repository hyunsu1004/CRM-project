package com.backend.demo.controller;

import com.backend.demo.dto.AttributeValueDTO;
import com.backend.demo.service.AttributeService;
import com.backend.demo.service.AttributeValueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/member/{memberId}/deals")
public class AttributeValueController {

    @Autowired
    private AttributeValueService attributeValueService;

    // 속성 값 추가 API
    @PostMapping("/{dealId}/attributes/{attributeId}/addValue")
    public ResponseEntity<?> addAttributeValue(
            @PathVariable Integer dealId,
            @PathVariable Integer attributeId,
            @RequestBody AttributeValueDTO valueDTO) {

        attributeValueService.addValue(dealId, attributeId, valueDTO);
        return ResponseEntity.ok("Attribute value added successfully!");
    }

    // 속성 값 수정 API
    @PutMapping("/{dealId}/attributes/{attributeId}/updateValue")
    public ResponseEntity<?> updateAttributeValue(
            @PathVariable Integer dealId,
            @PathVariable Integer attributeId,
            @RequestBody AttributeValueDTO valueDTO) {

        // 속성 값 수정 서비스 호출
        attributeValueService.updateValue(dealId, attributeId, valueDTO);

        return ResponseEntity.ok("Attribute value updated successfully!");
    }
}
