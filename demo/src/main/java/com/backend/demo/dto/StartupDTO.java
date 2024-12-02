package com.backend.demo.dto;

import com.backend.demo.entity.Startup;

public class StartupDTO {
    private String name;
    private Long id;

    public StartupDTO(Startup startup) {
        this.name = startup.getName();
        this.id = startup.getId();
    }
}
