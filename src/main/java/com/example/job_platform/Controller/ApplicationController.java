package com.example.job_platform.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.job_platform.DTO.ApplicationDTO;
import com.example.job_platform.DTO.UpdateApplicationStatusDTO;
import com.example.job_platform.Service.ApplicationService;


@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
	
	
	@Autowired
	private ApplicationService applicationService;
	
	
	@PostMapping("/apply")
	public ResponseEntity<String>apply(@RequestBody ApplicationDTO dto ){
		applicationService.applyJob(dto);
		return ResponseEntity.ok("Application Submitted");
		
	}
	
	@GetMapping("/employee/{employeeEmail}")
	public ResponseEntity<List<ApplicationDTO>>getByEmployeeEmail(@PathVariable String employeeEmail){
		return ResponseEntity.ok(applicationService.getByEmployeeEmail(employeeEmail));
	}
	
	@GetMapping("/recruiter/{recruiterEmail}")
	public ResponseEntity<List<ApplicationDTO>>getByRecruiterEmail(@PathVariable String recruiterEmail){
		return ResponseEntity.ok(applicationService.getByRecruiterEmail(recruiterEmail));
	}
	
	@GetMapping("/job/{jobId}")
	public ResponseEntity<List<ApplicationDTO>>getByJobId(@PathVariable Long jobId){
		return ResponseEntity.ok(applicationService.getByJobId(jobId));
	}
	
	@PutMapping("/status")
	public ResponseEntity<String>updateApplicationStatus(@RequestBody UpdateApplicationStatusDTO dto){
		applicationService.updateApplicationStatus(dto);
		return ResponseEntity.ok("Status Updated");
	}

}
