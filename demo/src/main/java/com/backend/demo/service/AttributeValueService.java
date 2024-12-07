package com.backend.demo.service;

import com.backend.demo.dto.AttributeValueDTO;
import com.backend.demo.entity.Attribute;
import com.backend.demo.entity.AttributeType;
import com.backend.demo.entity.Deal;
import com.backend.demo.entity.value.NumberValue;
import com.backend.demo.entity.value.StringValue;
import com.backend.demo.repository.AttributeRepository;
import com.backend.demo.repository.DealRepository;
import com.backend.demo.repository.NumberValueRepository;
import com.backend.demo.repository.StringValueRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AttributeValueService {

    private final DealRepository dealRepository;
    private final AttributeRepository attributeRepository;

    public AttributeValueService(DealRepository dealRepository, AttributeRepository attributeRepository) {
        this.dealRepository = dealRepository;
        this.attributeRepository = attributeRepository;
    }

    // 속성 값 추가 로직
    @Transactional
    public void addValue(Integer dealId, Integer attributeId, AttributeValueDTO valueDTO) {
        // Deal 확인
        Deal deal = dealRepository.findById(dealId).orElseThrow(() -> new RuntimeException("Deal not found"));
        // Attribute 확인
        Attribute attribute = attributeRepository.findById(attributeId).orElseThrow(() -> new RuntimeException("Attribute not found"));

        // 속성 값 저장 (자료형에 맞춰 처리)
        switch (attribute.getDataType()) {
            case AttributeType.INTEGER:
                saveNumberValue(attribute, valueDTO.getValue(), deal);
                break;
            case AttributeType.STRING:
                saveStringValue(attribute, valueDTO.getValue(), deal);
                break;
            default:
                throw new IllegalArgumentException("Unsupported data type: " + attribute.getDataType());
        }
    }

    // 속성 값 수정 (기존 값을 업데이트)
    @Transactional
    public void updateValue(Integer dealId, Integer attributeId, AttributeValueDTO valueDTO) {
        // Deal 확인
        Deal deal = dealRepository.findById(dealId).orElseThrow(() -> new RuntimeException("Deal not found"));
        // Attribute 확인
        Attribute attribute = attributeRepository.findById(attributeId).orElseThrow(() -> new RuntimeException("Attribute not found"));

        // 기존 값 찾기 (값이 존재하는 경우만 수정)
        switch (attribute.getDataType()) {
            case AttributeType.INTEGER:
                updateNumberValue(attribute, valueDTO.getValue(), deal);
                break;
            case AttributeType.STRING:
                updateStringValue(attribute, valueDTO.getValue(), deal);
                break;
            default:
                throw new IllegalArgumentException("Unsupported data type: " + attribute.getDataType());
        }
    }

    // 숫자형 값 수정
    private void updateNumberValue(Attribute attribute, String value, Deal deal) {
        NumberValue numberValue = deal.getNumberValues().stream()
                .filter(nv -> nv.getAttribute().equals(attribute))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Number value not found for this attribute"));

        try {
            numberValue.setValue(Double.valueOf(value)); // 값 업데이트
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid number value: " + value);
        }
    }

    // 문자열형 값 수정
    private void updateStringValue(Attribute attribute, String value, Deal deal) {
        StringValue stringValue = deal.getStringValues().stream()
                .filter(sv -> sv.getAttribute().equals(attribute))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("String value not found for this attribute"));

        stringValue.setValue(value); // 값 업데이트
    }

    // 숫자형 값 저장
    private void saveNumberValue(Attribute attribute, String value, Deal deal) {
        NumberValue numberValue = new NumberValue();
        numberValue.setAttribute(attribute);
        try {
            numberValue.setValue(Double.valueOf(value)); // 문자열을 숫자로 변환
            numberValue.setDeal(deal); // 속성 값이 어느 딜에 해당하는지 지정
            // 속성 값 리스트에 추가
            deal.getNumberValues().add(numberValue);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid number value: " + value);
        }
    }

    // 문자열형 값 저장
    private void saveStringValue(Attribute attribute, String value, Deal deal) {
        StringValue stringValue = new StringValue();
        stringValue.setAttribute(attribute);
        stringValue.setValue(value); // 문자열 값 저장
        stringValue.setDeal(deal); // 해당 딜에 속성 값 추가
        // 속성 값 리스트에 추가
        deal.getStringValues().add(stringValue);
    }
}
