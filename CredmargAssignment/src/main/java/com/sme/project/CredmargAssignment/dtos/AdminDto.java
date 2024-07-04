package com.sme.project.CredmargAssignment.dtos;

import com.sme.project.CredmargAssignment.entities.Email;
import com.sme.project.CredmargAssignment.entities.Employee;
import com.sme.project.CredmargAssignment.entities.Vendor;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AdminDto {

    private String id;
    private String name;
    private String email;
    private String password;
    private List<Employee> employees = new ArrayList<>();
    private List<Vendor> vendors = new ArrayList<>();
    private List<Email> emailLogs = new ArrayList<>();
}
