package com.sme.project.CredmargAssignment.dtos;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LoginRequest {
    private String email;
    private String password;


}

