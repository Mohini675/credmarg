package com.sme.project.CredmargAssignment.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Vendor {

    private String name;
    private String email;
    private String upi;
}