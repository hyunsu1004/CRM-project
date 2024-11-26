package com.backend.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Attribute {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String defaultValue;
    private String dataType;
    private String options; //select, multi_select 옵션들을 저장할 수 있을(JSON 형식으로 저장)

    //getters and setters
    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }
    public String getDescription(){
        return description;
    }
    public void setDescription(String description){
        this.description = description;
    }
    public String getDefaultValue(){
        return defaultValue;
    }
    public void setDefaultValue(String defaultValue){
        this.defaultValue = defaultValue;
    }
    public String getDataType() {
        return dataType;
    }
    public void setDataType(String dataType) {
        this.dataType = dataType;
    }
    public String getOptions(){
        return options;
    }
    public void setOptions(String options){
        this.options = options;
    }

}