package demo.crm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
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

    @OneToMany(mappedBy = "startup")
    private List<Deal> deals = new ArrayList<>();


}
