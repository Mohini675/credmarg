package com.sme.project.CredmargAssignment.dtos;

import com.sme.project.CredmargAssignment.entities.Vendor;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MailTemplate {

    private String message;
    private Vendor vendor;
}
