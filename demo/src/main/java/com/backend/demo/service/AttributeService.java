package com.backend.demo.service;

import com.backend.demo.dto.AttributeDTO;
import com.backend.demo.dto.AttributeValueDTO;
import com.backend.demo.entity.Attribute;
import com.backend.demo.entity.Deal;
import com.backend.demo.entity.value.*;
import com.backend.demo.repository.AttributeRepository;
import com.backend.demo.repository.DealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import java.util.List;

@Service
public class AttributeService {
    @Autowired
    private final AttributeRepository attributeRepository;
    @Autowired
    private final DealRepository dealRepository;

    public AttributeService(AttributeRepository attributeRepository, DealRepository dealRepository) {
        this.attributeRepository = attributeRepository;
        this.dealRepository = dealRepository;
    }

    /**
     * 속성 추가 로직
     */
    @Transactional
    public void addAttributeToAllDeals(AttributeDTO attributeDTO) {
        // 모든 딜 조회 (특정 회원의 모든 딜)
        List<Deal> allDeals = dealRepository.findAll();

        // 새로운 Attribute 생성
        Attribute attribute = new Attribute();
        attribute.setName(attributeDTO.getName());
        attribute.setDescription(attributeDTO.getDescription());
        attribute.setDataType(attributeDTO.getDataType());
        attribute.setDefaultValue(attributeDTO.getDefaultValue());

        // 속성 저장
        attributeRepository.save(attribute);

        // 모든 딜에 대해 속성 추가
        for (Deal deal : allDeals) {
            attribute.setDeal(deal); // 속성을 각 딜에 연결
            deal.getAttributes().add(attribute); // 딜에 속성 추가
        }
    }

    /**
     * 속성값 추가 로직
     */
    @Transactional
    public void addAttributeValueToDeal(Integer dealId, Integer attributeId, AttributeValueDTO valueDTO) {

        // Deal 확인
        Deal deal = dealRepository.findById(dealId)
                .orElseThrow(() -> new RuntimeException("Deal Not Found"));

        // Attribute 확인
        Attribute attribute = attributeRepository.findById(attributeId)
                .orElseThrow(() -> new RuntimeException("Attribute Not Found"));

        // 값 저장 (자료형에 따라 다르게 저장)
        switch (attribute.getDataType()) {
            case "integer":
                saveIntegerValue(attribute, valueDTO.getValue());
                break;
            case "string":
                saveStringValue(attribute, valueDTO.getValue());
                break;
            case "date":
                saveDateValue(attribute, valueDTO.getValue());
                break;
            case "checkbox":
                saveBooleanValue(attribute, valueDTO.getValue());
                break;
            case "multiSelect":
                saveListValue(attribute, valueDTO.getValue());
                break;
            default:
                throw new IllegalArgumentException("Unsupported data type: " + attribute.getDataType());
        }
    }

    // 자료형에 맞게 값 저장 (정수형)
    private void saveIntegerValue(Attribute attribute, String value) {
        NumberValue numberValue = new NumberValue();
        numberValue.setAttribute(attribute);
        try {
            numberValue.setValue(Double.valueOf(value));  // 문자열을 숫자로 변환
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid number value: " + value);
        }
        attribute.getNumberValues().add(numberValue);
    }

    // 자료형에 맞게 값 저장 (문자열형)
    private void saveStringValue(Attribute attribute, String value) {
        StringValue stringValue = new StringValue();
        stringValue.setAttribute(attribute);
        stringValue.setValue(value);  // 그대로 문자열 값 저장
        attribute.getStringValues().add(stringValue);
    }

    // 자료형에 맞게 값 저장 (날짜형)
    private void saveDateValue(Attribute attribute, String value) {
        DateValue dateValue = new DateValue();
        dateValue.setAttribute(attribute);
        try {
            dateValue.setValue(LocalDate.parse(value));  // 문자열을 날짜로 변환
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid date value: " + value);
        }
        attribute.getDateValues().add(dateValue);
    }

    // 자료형에 맞게 값 저장 (체크박스형)
    private void saveBooleanValue(Attribute attribute, String value) {
        BooleanValue booleanValue = new BooleanValue();
        booleanValue.setAttribute(attribute);
        booleanValue.setValue(Boolean.valueOf(value));  // 문자열을 boolean으로 변환
        attribute.getBooleanValues().add(booleanValue);
    }

    // 자료형에 맞게 값 저장 (다중 선택형)
    private void saveListValue(Attribute attribute, String value) {
        ListValue listValue = new ListValue();
        listValue.setAttribute(attribute);
        listValue.setValues(Arrays.asList(value.split(",")));  // 쉼표로 구분된 값을 리스트로 저장
        attribute.getListValues().add(listValue);
    }

    // 속성 값 수정 (기존 값을 업데이트)
    @Transactional
    public void updateAttributeValueInDeal(Integer dealId, Integer attributeId, AttributeValueDTO valueDTO) {
        addAttributeValueToDeal(dealId, attributeId, valueDTO); // 수정은 추가 로직과 동일
    }






//    private final AttributeRepository attributeRepository;
//    private final ObjectMapper objectMapper;
//
//    public AttributeService(AttributeRepository attributeRepository, ObjectMapper objectMapper) {
//        this.attributeRepository = attributeRepository;
//        this.objectMapper = objectMapper;
//    }
//
//    //속성 추가 메서드
//    public Attribute addAttribute(String name,String description,String defaultValue,String dataType,String [] options) throws JsonProcessingException {
//        //중복 이름 확인
//        if(attributeRepository.existsByName(name)){
//            throw new IllegalArgumentException("이미 존재하는 속성입니다.");
//        }
//
//        //엔티티 생성
//        Attribute attribute = new Attribute();
//        attribute.setName(name);
//        attribute.setDescription(description);
//        attribute.setDefaultValue(defaultValue);
//        attribute.setDataType(dataType);
//
//        //옵션을 JSON으로 변환하여 저장
//        if(options != null){
//            String optionsJson = objectMapper.writeValueAsString(options);
//            attribute.setOptions(optionsJson);
//        }
//        //데이터 베이스 저장
//        return attributeRepository.save(attribute);
//    }

}
