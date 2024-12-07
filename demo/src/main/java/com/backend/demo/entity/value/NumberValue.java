package com.backend.demo.entity.value;

import com.backend.demo.entity.Attribute;
import com.backend.demo.entity.Deal;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class NumberValue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "attribute_id")
    private Attribute attribute;

    @Column(name = "number_value")
    private Double value;

    @ManyToOne
    @JoinColumn(name = "deal_id")
    private Deal deal;
}
