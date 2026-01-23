
import { BranchData } from './types';

export const BRANCH_SALES_MAPPING: BranchData = {
  "Mumbai": ["Amit Korgaonkar", "Santosh Pachratkar", "Rakesh Jain", "Kamlesh Sutar", "Pradeep Jadhav"],
  "Ulasnagar": ["Shiv Ratan (Shivam)", "Viay Sutar"],
  "Kolkata": ["Rajesh Jain"],
  "Jaipur": ["Durgesh Bhati"],
  "Delhi": ["Lalit Maroo", "Anish Jain", "Suresh Nautiyal", "Rahul Vashishtha", "Mohit Sharma"],
  "Ahmedabad": ["ravindra kaushik"],
  "Bangalore": ["Balasubramanyam", "Tarachand"],
  "Tirupur": ["Alexander Pushkin", "Subramanian", "Mani Maran"],
  "Surat": ["Anil Marthe", "Raghuveer Darbar", "Sailesh Pathak", "Vanraj Darbar"]
};

export const BRANCHES = Object.keys(BRANCH_SALES_MAPPING);

export const GINZA_COLORS = {
  primary: '#000000',
  secondary: '#ed1c24', // Standard red from the logo style
  accent: '#71717a'
};
