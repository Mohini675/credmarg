package com.sme.project.CredmargAssignment.service.impl;

import com.sme.project.CredmargAssignment.dtos.AdminDto;
import com.sme.project.CredmargAssignment.dtos.MailTemplate;
import com.sme.project.CredmargAssignment.entities.Admin;
import com.sme.project.CredmargAssignment.entities.Email;
import com.sme.project.CredmargAssignment.entities.Employee;
import com.sme.project.CredmargAssignment.entities.Vendor;
import com.sme.project.CredmargAssignment.exceptions.DuplicateKeyException;
import com.sme.project.CredmargAssignment.exceptions.ResourceNotFoundException;
import com.sme.project.CredmargAssignment.repositories.AdminRepository;
import com.sme.project.CredmargAssignment.service.AdminService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private ModelMapper mapper;

    public AdminDto createAdmin(AdminDto adminDto) {

        Admin admin = mapper.map(adminDto, Admin.class);
        if (adminRepository.findByEmail(admin.getEmail()).isPresent()) {
            throw new DuplicateKeyException("Email already exists");
        }
        return mapper.map(adminRepository.save(admin),AdminDto.class);
    }

    public AdminDto addEmployeeToAdmin(String adminId, Employee employee) {
        Admin admin = adminRepository.findById(adminId).orElseThrow(() -> new ResourceNotFoundException("Admin not found"));
        admin.getEmployees().add(employee);
        return mapper.map(adminRepository.save(admin),AdminDto.class);
    }

    public AdminDto addVendorToAdmin(String adminId, Vendor vendor) {
        Admin admin = adminRepository.findById(adminId).orElseThrow(() -> new ResourceNotFoundException("Admin not found"));
        admin.getVendors().add(vendor);
        return  mapper.map(adminRepository.save(admin),AdminDto.class);
    }

//    public AdminDto sendEmailToVendors(String adminId, String template) {
//        Admin admin = adminRepository.findById(adminId).orElseThrow(() -> new ResourceNotFoundException("Admin not found"));
//        for (Vendor vendor : admin.getVendors()) {
//            String emailContent = template.replace("{name}", vendor.getName()).replace("{upi}", vendor.getUpi());
//            Email emailLog = new Email();
//            emailLog.setMessage(emailContent);
//            emailLog.setRecipient(vendor.getEmail());
//            emailLog.setSentAt(java.time.LocalDateTime.now().toString());
//            admin.getEmailLogs().add(emailLog);
//            // Mock sending email by printing to console
//            System.out.println("Sending email to " + vendor.getEmail() + ": " + emailContent);
//        }
//        return mapper.map(adminRepository.save(admin),AdminDto.class);
//    }

    public AdminDto sendEmailToVendor(String adminId, MailTemplate template) {
        Admin admin = adminRepository.findById(adminId).orElseThrow(() -> new ResourceNotFoundException("Admin not found"));
            Vendor vendor = template.getVendor();
            String emailContent = template.getMessage().replace("{name}", vendor.getName()).replace("{upi}", vendor.getUpi());
            Email emailLog = new Email();
            emailLog.setMessage(emailContent);
            emailLog.setRecipient(vendor.getEmail());
            emailLog.setSentAt(java.time.LocalDateTime.now().toString());
            admin.getEmailLogs().add(emailLog);
            // Mock sending email by printing to console
            System.out.println("Sending email to " + vendor.getEmail() + ": " + emailContent);

        return mapper.map(adminRepository.save(admin),AdminDto.class);
    }

    @Override
    public Vendor getVendor(String adminId, String email) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found"));

        // Iterate through vendors to find the one with matching email
        for (Vendor vendor : admin.getVendors()) {
            if (Objects.equals(vendor.getEmail(), email)) {
                return vendor;
            }
        }

        // If no vendor found with the specified email
        throw new ResourceNotFoundException("Vendor not found with email: " + email);
    }


    public List<Email> getEmailLogs(String adminId) {
        Admin admin = adminRepository.findById(adminId).orElseThrow(() -> new ResourceNotFoundException("Admin not found"));
        return admin.getEmailLogs();
    }
    @Override
    public List<Employee> getAllEmployee(String adminId) {
        Admin admin = adminRepository.findById(adminId).orElseThrow(() -> new ResourceNotFoundException("No admin present of this id"));
        return admin.getEmployees();
    }

    @Override
    public List<Vendor> getAllVendors(String adminId) {
        Admin admin = adminRepository.findById(adminId).orElseThrow(() -> new ResourceNotFoundException("No admin present of this id"));
        return admin.getVendors();
    }

    @Override
    public List<AdminDto> getAll() {
        List<Admin> all = adminRepository.findAll();
        List<AdminDto> listDto = all.stream().map(object->new ModelMapper().map(object,AdminDto.class)).collect(Collectors.toList());
        return listDto;
    }

    @Override
    public AdminDto getAdminByEmailAndPassword(String email, String password) {
        Admin admin = adminRepository.findByEmailAndPassword(email, password).orElseThrow(()->new ResourceNotFoundException("Admin cannot found with the given Email an password"));
       return mapper.map(admin,AdminDto.class);
    }


}

