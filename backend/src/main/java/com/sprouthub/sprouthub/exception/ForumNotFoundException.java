package com.sprouthub.sprouthub.exception;

public class ForumNotFoundException extends RuntimeException {
    public ForumNotFoundException(String message) {
        super(message);
    }
}