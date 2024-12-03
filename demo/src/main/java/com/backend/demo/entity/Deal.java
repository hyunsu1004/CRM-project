package com.backend.demo.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // Lazy loading 관련 필드 무시
public class Deal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String creator; //생성자
    @JsonView()

//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSSSSS")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "UTC")
    private Date createTime; //생성 시간
    @Enumerated(EnumType.STRING)

    private DealStatus status; // 검토상태

    //하나의 스타트업은 여러 딜을 가질 수 있음.
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "startup_id") //외래키 이름 설정.
    // @JsonIgnore //startup 필드를 직렬화하지 않음. 이렇게 할시 /api/deals 는 정상적으로 가져와짐.하지만 딜 추가가 실패함.
    @JsonProperty("startup") //startup 필드 직렬화. //딜 추가는 성공적으로 되지만 , get("/api/deals")가 작동하지 않음.
    //EAGER로 실행하니 해결!!!!!!!!!!!!!!!!!!!!!!!!!!0
    private Startup startup;

    private String startupName; // 스타트업 이름 필드 추가

    //하나의 딜은 여러 노트를 가질 수 있음.
    @OneToMany(mappedBy = "deal",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<DealNote> notes; //DealNote와의 관계


    //  동적 속성 부분
    @OneToMany(mappedBy = "deal", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Attribute> attributes = new ArrayList<>();

    //startup의 name을 반환하는 getter추가
    public String getStartupName(){
        return startup != null ? startup.getName() : "";
    }
    // 엔티티가 DB에 저장되기 전에 startupName을 자동 설정하는 메서드
    @PrePersist
    @PreUpdate
    public void setStartupName() {
        if (this.startup != null) {
            this.startupName = this.startup.getName(); // startup에서 name을 가져와서 설정
        }
    }



}

