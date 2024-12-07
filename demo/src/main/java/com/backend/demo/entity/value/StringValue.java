package com.backend.demo.entity.value;

import com.backend.demo.entity.Attribute;
import com.backend.demo.entity.Deal;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class StringValue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "attribute_id")
    private Attribute attribute;

    @Column(name = "string_value")
    private String value;

    @ManyToOne
    @JoinColumn(name = "deal_id")
    private Deal deal;
}
