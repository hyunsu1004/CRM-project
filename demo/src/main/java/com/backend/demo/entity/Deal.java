package com.backend.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.Date;

@Entity
@Getter
@Setter
public class Deal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String creator; //생성자

    private Date createTime; //생성 시간
    @Enumerated(EnumType.STRING)
    private DealStatus status; // 검토상태

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "startup_id") //외래키 이름 설정.
    private Startup startup;
}