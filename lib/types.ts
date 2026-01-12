// keeping statuses as a fixed list.
export type ApplicationStatus =
  | "Wishlist"
  | "Applied"
  | "Recruiter Screen"
  | "Interviewing"
  | "Offer"
  | "Rejected"
  | "Archived";

// This is one job application record.
export type JobApplication = {
  id: string;               
  companyName: string;      
  roleTitle: string;        
  location: string;         
  status: ApplicationStatus;

  jobUrl?: string;          
  notes?: string;           

  appliedDate?: string;     
  createdAt: string;        
  updatedAt: string;       
};