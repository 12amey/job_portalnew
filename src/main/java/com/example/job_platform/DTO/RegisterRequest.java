package com.example.job_platform.DTO;

import com.example.job_platform.Enum.Role;

public class RegisterRequest {
	
	public Long id;
	public String name;
	public String email;
	public String password;
	public Role role;
	
	// No-args constructor needed for JSON deserialization
	public RegisterRequest() {}

	public RegisterRequest(Long id, String name, String email, String password, Role role) {
		this.id=id;
		this.name=name;
		this.email=email;
		this.password=password;
		this.role=role;
	}
}
