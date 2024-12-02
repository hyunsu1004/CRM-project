package com.backend.demo.entity;

import com.backend.demo.entity.value.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter @Setter
public class Attribute {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String description;
    private String defaultValue;
    private String dataType;
    private String options; //select, multi_select 옵션들을 저장할 수 있을(JSON 형식으로 저장)

    @ManyToOne
    @JoinColumn(name = "deal_id")
    private Deal deal;

    @OneToMany(mappedBy = "attribute", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StringValue> stringValues; // 문자열 값 리스트
    @OneToMany(mappedBy = "attribute", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NumberValue> numberValues; // 숫자 값 리스트
    @OneToMany(mappedBy = "attribute", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DateValue> dateValues; // 날짜 값 리스트
    @OneToMany(mappedBy = "attribute", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BooleanValue> booleanValues; // 체크박스 값 리스트
    @OneToMany(mappedBy = "attribute", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ListValue> listValues; // 다중 선택 값 리스트

}