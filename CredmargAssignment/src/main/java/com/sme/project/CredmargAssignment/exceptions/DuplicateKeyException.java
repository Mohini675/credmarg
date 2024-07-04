package com.sme.project.CredmargAssignment.exceptions;

public class DuplicateKeyException extends RuntimeException {

    public DuplicateKeyException (){
        super("Duplicate key!!");
    }
    public DuplicateKeyException(String message){
        super(message);
    }
}
