package demo.crm.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter @Setter
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long member_id;

    private String email;
    private String password;
    private String name;
    private String phone;
    private Date birth;

    private String role; // 이  멤버의 권한
    //private List<Deal> Deals = new ArrayList<>();
}
