package com.backend.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Investor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    String name; //투자자명
    String category; //분류
    String totalCount; //총 투자 건수
    String totalInvestment; //총 투자 금액
    String averageInvestment; //평균 집행 금액
    String recentFunding; //최근 투자 날짜
    String keyCategory; //주요 투자 분야

}
