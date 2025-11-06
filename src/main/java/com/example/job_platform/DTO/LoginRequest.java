package com.example.job_platform.DTO;

public class LoginRequest {
	public String email;
	public String password;

	// No-args constructor needed for JSON deserialization
	public LoginRequest() {}
	
	public LoginRequest(String email, String password) {
		this.email = email;
		this.password = password;
	}
}
