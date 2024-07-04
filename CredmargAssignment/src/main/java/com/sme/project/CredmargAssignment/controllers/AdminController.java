package com.sme.project.CredmargAssignment.controllers;

import com.sme.project.CredmargAssignment.dtos.AdminDto;
import com.sme.project.CredmargAssignment.dtos.LoginRequest;
import com.sme.project.CredmargAssignment.dtos.MailTemplate;
import com.sme.project.CredmargAssignment.entities.Admin;
import com.sme.project.CredmargAssignment.entities.Email;
import com.sme.project.CredmargAssignment.entities.Employee;
import com.sme.project.CredmargAssignment.entities.Vendor;
import com.sme.project.CredmargAssignment.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/admins")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping
    public ResponseEntity<AdminDto> createAdmin(@RequestBody AdminDto adminDto) {
        AdminDto admin = adminService.createAdmin(adminDto);
        return new ResponseEntity<>(admin, HttpStatus.CREATED);
    }

    @PostMapping("/getAdmin")
    public ResponseEntity<AdminDto> getAdmin(@RequestBody LoginRequest loginRequest) {
        AdminDto adminDto = adminService.getAdminByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword());
        return  new ResponseEntity<>(adminDto,HttpStatus.OK);
    }

    @PostMapping("/{adminId}/employees")
    public ResponseEntity<AdminDto> addEmployee(@PathVariable String adminId, @RequestBody Employee employee) {
        AdminDto adminDto = adminService.addEmployeeToAdmin(adminId, employee);
        return new ResponseEntity<>(adminDto, HttpStatus.CREATED);
    }

    @PostMapping("/{adminId}/vendors")
    public ResponseEntity<AdminDto> addVendor(@PathVariable String adminId, @RequestBody Vendor vendor) {
        AdminDto adminDto = adminService.addVendorToAdmin(adminId, vendor);
        return new ResponseEntity<>(adminDto, HttpStatus.CREATED);
    }

//    @PostMapping("/{adminId}/sendEmails")
//    public ResponseEntity<AdminDto> sendEmails(@PathVariable String adminId, @RequestBody String template) {
//        AdminDto adminDto = adminService.sendEmailToVendors(adminId, template);
//        return new ResponseEntity<>(adminDto, HttpStatus.CREATED);
//    }

    @PostMapping("/{adminId}/sendEmail")
    public ResponseEntity<AdminDto> sendEmails(@PathVariable String adminId, @RequestBody MailTemplate template) {
        AdminDto adminDto = adminService.sendEmailToVendor(adminId, template);
        return new ResponseEntity<>(adminDto, HttpStatus.CREATED);
    }

    @GetMapping("/{adminId}/emails")
    public ResponseEntity<List<Email>> getEmailLogs(@PathVariable String adminId) {
        List<Email> emailLogs = adminService.getEmailLogs(adminId);
        return new ResponseEntity<>(emailLogs,HttpStatus.OK);
    }

    @GetMapping("/{adminId}/vendor/{email}")
    public ResponseEntity<Vendor> getVendor(@PathVariable String adminId, @PathVariable String email) {
        //String email = requestBody.get("email");
        Vendor vendor = adminService.getVendor(adminId, email);
        return new ResponseEntity<>(vendor, HttpStatus.OK);
    }

    @GetMapping("/{adminId}/employees")
    public ResponseEntity<List<Employee>> getAllEmployee(@PathVariable String adminId) {
        List<Employee> allEmployee = adminService.getAllEmployee(adminId);
        return new ResponseEntity<>(allEmployee,HttpStatus.OK);
    }

    @GetMapping("/{adminId}/vendors")
    public ResponseEntity<List<Vendor>> getAllVendors(@PathVariable String adminId) {
        List<Vendor> allEmployee = adminService.getAllVendors(adminId);
        return new ResponseEntity<>(allEmployee,HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<List<AdminDto>> getAll() {
        List<AdminDto> all = adminService.getAll();
        return new ResponseEntity<>(all,HttpStatus.OK);
    }
}

