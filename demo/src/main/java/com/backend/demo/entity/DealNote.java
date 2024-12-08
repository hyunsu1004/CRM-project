package com.backend.demo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

//딜 페이지 노트 데이터 베이스
@Entity
@Getter @Setter
public class DealNote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title; // 노트 제목
    private String content; // 노트 내용

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deal_id") // 외래키 설정
    @JsonBackReference
    private Deal deal;
}
