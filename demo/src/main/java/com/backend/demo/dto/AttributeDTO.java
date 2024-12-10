package com.backend.demo.dto;

import com.backend.demo.entity.AttributeType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class AttributeDTO {
    private String name;
    private String description;
    private String dataType;
    private String defaultValue;
    private List<String> selectedOptions;
}
