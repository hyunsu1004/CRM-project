package com.backend.demo.service;

import com.backend.demo.dto.AttributeDTO;
import com.backend.demo.dto.AttributeValueDTO;
import com.backend.demo.entity.Attribute;
import com.backend.demo.entity.AttributeType;
import com.backend.demo.entity.Deal;
import com.backend.demo.entity.value.*;
import com.backend.demo.repository.AttributeRepository;
import com.backend.demo.repository.DealRepository;
import com.backend.demo.repository.NumberValueRepository;
import com.backend.demo.repository.StringValueRepository;
import com.sun.jdi.BooleanValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import java.util.List;

@Service
@Transactional
public class AttributeService {

    @Autowired
    private final AttributeRepository attributeRepository;
    public AttributeService(AttributeRepository attributeRepository) {
        this.attributeRepository = attributeRepository;
    }

    // 속성 생성
    public Attribute createAttribute(AttributeDTO attributeDTO) {
        // DTO에서 데이터를 가져와 Attribute 엔티티 생성
        System.out.println("1번 작동 점검 : "+ attributeDTO.getName());
        Attribute attribute = new Attribute();
        attribute.setName(attributeDTO.getName());
        System.out.println("2번 작동 점검 : "+ attribute.getName());
        attribute.setDescription(attributeDTO.getDescription());
        attribute.setDefaultValue(attributeDTO.getDefaultValue());
        System.out.println("3번 작동 점검 : "+ attribute.getDefaultValue());

        attribute.setDataType(AttributeType.valueOf(attributeDTO.getDataType().toUpperCase()));
        System.out.println("4번 작동 점검 : "+ attribute.getDataType());


        System.out.println("5번 작동 점검 : "+ attribute.getName());
        // 옵션 저장 (JSON 형식으로 저장 가능)
        if (attributeDTO.getSelectedOptions() != null && !attributeDTO.getSelectedOptions().isEmpty()) {
            attribute.setOptions(String.join(",", attributeDTO.getSelectedOptions())); // 쉼표로 구분하여 저장
        }
        System.out.println("6번 작동 점검 : "+ attribute.getName());
        return attributeRepository.save(attribute);
    }

}
