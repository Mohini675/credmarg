package com.sme.project.CredmargAssignment.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Document(collection = "admins")
public class Admin {

    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private List<Employee> employees = new ArrayList<>();
    private List<Vendor> vendors = new ArrayList<>();
    private List<Email> emailLogs = new ArrayList<>();
}

