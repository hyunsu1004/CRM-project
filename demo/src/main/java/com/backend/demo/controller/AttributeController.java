package com.backend.demo.controller;

import com.backend.demo.dto.AttributeDTO;
import com.backend.demo.entity.Attribute;
import com.backend.demo.service.AttributeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/member/{memberId}/")
public class AttributeController {

    @Autowired
    private AttributeService attributeService;

    public AttributeController(AttributeService attributeService) {
        this.attributeService = attributeService;
    }

    // 속성 추가 API (모든 딜에 속성 추가)
    @PostMapping("deals/addattributes")
    public ResponseEntity<?> addAttribute(@RequestBody AttributeDTO attributeDTO) {
        try {
//            System.out.println("프론트 -> 백엔드: 속성 추가 데이터 전송 완료");
//            System.out.println(attributeDTO.getName());
            Attribute attribute = attributeService.createAttribute(attributeDTO);
            return ResponseEntity.ok(attribute);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add attribute to all deals");
        }
    }
}

//package com.backend.demo.controller;
//
//import com.backend.demo.entity.Attribute;
//import com.backend.demo.service.AttributeService;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/attribute")
//public class AttributeController {
//
//
//    private final AttributeService attributeService;
//
//    public AttributeController(AttributeService attributeService) {
//        this.attributeService = attributeService;
//    }
//
//    //속성 추가 API
//    @PostMapping
//    public ResponseEntity<Attribute> addAttribute(@RequestBody Map<String,Object> requestData){
//        try {
//            String name = (String) requestData.get("name");
//            String description = (String) requestData.get("description");
//            String defaultValue = (String) requestData.get("defaultValue");
//            String dataType = (String) requestData.get("dataType");
//            List<String> options = (List<String>) requestData.get("options");
//
//            Attribute attribute = attributeService.addAttribute(name,description,defaultValue,dataType,options.toArray(new String[0]));
//            return ResponseEntity.ok(attribute);
//        }catch(IllegalArgumentException e){
//            return ResponseEntity.badRequest().body(null);
//        }catch(JsonProcessingException e){
//            return ResponseEntity.status(500).body(null);
//        }
//    }
//
//}
