package com.sme.project.CredmargAssignment.service;

import com.sme.project.CredmargAssignment.dtos.AdminDto;
import com.sme.project.CredmargAssignment.dtos.MailTemplate;
import com.sme.project.CredmargAssignment.entities.Admin;
import com.sme.project.CredmargAssignment.entities.Email;
import com.sme.project.CredmargAssignment.entities.Employee;
import com.sme.project.CredmargAssignment.entities.Vendor;

import java.util.List;
import java.util.Optional;
import java.util.Optional;

public interface AdminService {

    public AdminDto createAdmin(AdminDto adminDto);
    public AdminDto addEmployeeToAdmin(String adminId, Employee employee);
    public AdminDto addVendorToAdmin(String adminId, Vendor vendor);
    //public AdminDto sendEmailToVendors(String adminId, String template);
    public List<Email> getEmailLogs(String adminId);
    public AdminDto getAdminByEmailAndPassword(String email, String password);
    public List<Employee> getAllEmployee(String adminId);
    public List<Vendor> getAllVendors(String adminId);
    public List<AdminDto> getAll();
    public AdminDto sendEmailToVendor(String adminId, MailTemplate template);
    public Vendor getVendor(String adminId,String email);

}
