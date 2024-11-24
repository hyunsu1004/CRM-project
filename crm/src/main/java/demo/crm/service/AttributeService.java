package demo.crm.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import demo.crm.entity.Attribute;
import demo.crm.repository.AttributeRepository;
import org.springframework.stereotype.Service;

@Service
public class AttributeService {


    private final AttributeRepository attributeRepository;
    private final ObjectMapper objectMapper;

    public AttributeService(AttributeRepository attributeRepository, ObjectMapper objectMapper) {
        this.attributeRepository = attributeRepository;
        this.objectMapper = objectMapper;
    }

    //속성 추가 메서드
    public Attribute addAttribute(String name, String description, String defaultValue, String dataType, String [] options) throws JsonProcessingException {
        //중복 이름 확인
        if(attributeRepository.existsByName(name)){
            throw new IllegalArgumentException("이미 존재하는 속성입니다.");
        }

        //엔티티 생성
        Attribute attribute = new Attribute();
        attribute.setName(name);
        attribute.setDescription(description);
        attribute.setDefaultValue(defaultValue);
        attribute.setDataType(dataType);

        //옵션을 JSON으로 변환하여 저장
        if(options != null){
            String optionsJson = objectMapper.writeValueAsString(options);
            attribute.setOptions(optionsJson);
        }
        //데이터 베이스 저장
        return attributeRepository.save(attribute);
    }

}
