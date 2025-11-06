package com.example.job_platform.DTO;

import com.example.job_platform.Enum.Role;

public class AuthResponse {

	public String token;
	public String email;
	public String name;
	public Role role;

	
	public AuthResponse() {} 
	
	public AuthResponse(String token, String email, String name, Role role) {
		this.token = token;
		this.email = email;
		this.name = name;
		this.role = role;
	}
}
