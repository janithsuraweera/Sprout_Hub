package com.sprouthub.sprouthub.exception;

public class TutorialNotFoundException extends RuntimeException {
    public TutorialNotFoundException(String message) {
        super(message);
    }
}