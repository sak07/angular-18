import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Employee } from './model/employee';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NgFor, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  employees: Employee[] = [];
  newEmployee: Employee = new Employee();
  editingEmployee: Employee | null = null;
  isEditMode: boolean = false;

  private readonly STORAGE_KEY = 'employee-management-data';

  ngOnInit(): void {
    this.loadEmployees();
  }

  save(): void {
    if (!this.newEmployee.firstName?.trim() || !this.newEmployee.lastName?.trim()) {
      return;
    }
    
    if (this.isEditMode && this.editingEmployee) {
      // Update existing employee
      const index = this.employees.findIndex(emp => emp.id === this.editingEmployee!.id);
      if (index !== -1) {
        this.employees[index] = this.newEmployee.clone();
        this.saveEmployees();
        this.cancelEdit();
      }
    } else {
      // Create new employee
      const employeeToAdd = this.newEmployee.clone();
      this.employees = [...this.employees, employeeToAdd];
      this.saveEmployees();
      this.clear();
    }
  }

  clear(): void {
    this.newEmployee = new Employee();
    this.cancelEdit();
  }

  editEmployee(employee: Employee): void {
    this.editingEmployee = employee;
    this.isEditMode = true;
    this.newEmployee = employee.clone();
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.editingEmployee = null;
    this.newEmployee = new Employee();
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter(emp => emp.id !== id);
    this.saveEmployees();
  }

  private loadEmployees(): void {
    try {
      // Check if we're in the browser environment
      if (typeof window !== 'undefined' && window.localStorage) {
        const storedData = localStorage.getItem(this.STORAGE_KEY);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          this.employees = parsedData.map((emp: any) => new Employee(
            emp.id,
            emp.firstName,
            emp.lastName,
            emp.email,
            emp.department,
            emp.salary,
            emp.dateOfJoining,
            emp.isActive
          ));
        }
      }
    } catch (error) {
      console.error('Error loading employees from localStorage:', error);
      this.employees = [];
    }
  }

  private saveEmployees(): void {
    try {
      // Check if we're in the browser environment
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.employees));
      }
    } catch (error) {
      console.error('Error saving employees to localStorage:', error);
    }
  }

  // Method to clear all data (useful for testing)
  clearAllData(): void {
    if (confirm('Are you sure you want to delete all employee data? This action cannot be undone.')) {
      this.employees = [];
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(this.STORAGE_KEY);
      }
    }
  }
}
