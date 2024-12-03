package com.backend.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailRequestDto {
    @NotEmpty
    private String email;
}
