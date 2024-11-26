package com.backend.demo.dto;

import com.backend.demo.entity.DealStatus;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Date;

@Getter
@Setter
public class DealDTO {
    private String creator; //생성자
    private Date createDate; //생성시간
    private DealStatus status; //검토상태
    private Long startupId; //관련스타트업의 Id
}