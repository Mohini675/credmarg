package com.sme.project.CredmargAssignment.entities;

import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class Email {
    private String message;
    private String recipient;
    private String sentAt;
}