package com.sme.project.CredmargAssignment.exceptions;

import com.sme.project.CredmargAssignment.dtos.ApiResponseMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    //handle resource not found exception
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponseMessage> resourceNotFoundException(ResourceNotFoundException ex) {
        logger.info("Exception Handler invoked!!");
        ApiResponseMessage response = ApiResponseMessage.builder().message(ex.getMessage()).status(HttpStatus.NOT_FOUND).success(true).build();
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<ApiResponseMessage> DuplicateKeyException (DuplicateKeyException ex) {
        logger.info("Exception Handler invoked!!");
        ApiResponseMessage response = ApiResponseMessage.builder().message(ex.getMessage()).status(HttpStatus.CONFLICT).success(true).build();
        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }
}
