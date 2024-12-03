package com.backend.demo.entity.value;

import com.backend.demo.entity.Attribute;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class ListValue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "attribute_id")
    private Attribute attribute;

    @ElementCollection
    @Column(name = "list_value")
    private List<String> values;
}
