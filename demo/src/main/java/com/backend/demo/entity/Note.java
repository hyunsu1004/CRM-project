package com.backend.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter @Setter
//메인 페이지 노트 데이터베이스
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    private String title; //노트 제목
    private String content; // 노트 내용
    //파일 저장도 따로 구현해야함.
  }
