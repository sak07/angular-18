export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  department?: string;
  salary?: number;
  dateOfJoining?: string; // ISO date string
  isActive?: boolean;

  constructor(
    id: number = 0,
    firstName: string = '',
    lastName: string = '',
    email?: string,
    department?: string,
    salary?: number,
    dateOfJoining?: string,
    isActive?: boolean
  ) {
    this.id = id || this.generateId();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.department = department;
    this.salary = salary;
    this.dateOfJoining = dateOfJoining;
    this.isActive = isActive;
  }

  private generateId(): number {
    return Date.now() + Math.floor(Math.random() * 1000);
  }

  // Method to create a copy of the employee
  clone(): Employee {
    return new Employee(
      this.id,
      this.firstName,
      this.lastName,
      this.email,
      this.department,
      this.salary,
      this.dateOfJoining,
      this.isActive
    );
  }
}


