package com.backend.demo.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Startup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; //회사명
    private String productOrService; // 제품/서비스
    private String technology; //기술
    private String category; //분야
    private String totalCapital; //총 자본금
    private String totalInvestment; //총 투자금
    private String recentInvestment; //최근 투자 단계
    private String recentFunding; //최근 투자 유치
    private String keyInvestors; //주요 투자자
    private boolean interest = false; //기본값 설정.
//    //딜과 startup간의 관계
//    //하나의 회사는 여러 딜을 가질 수 있음.
//    @OneToMany(mappedBy = "startup",cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonManagedReference
//    private List<Deal> deals; //Deal과의 관계


}