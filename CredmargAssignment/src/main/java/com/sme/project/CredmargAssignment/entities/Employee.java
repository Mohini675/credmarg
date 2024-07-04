package com.sme.project.CredmargAssignment.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Employee {

    private String name;
    private String designation;
    private double ctc;
    private String email;
}
