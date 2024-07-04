package com.sme.project.CredmargAssignment.repositories;

import com.sme.project.CredmargAssignment.entities.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends MongoRepository<Admin,String> {
    Optional<Admin> findByEmailAndPassword(String email, String password);
    Optional<Admin> findByEmail(String email);

}
