package com.example.backend.dtos;

public class confirmdto {
    private Long id;
    private String code;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public confirmdto(Long id, String code) {
        this.id = id;
        this.code = code;
    }
}
