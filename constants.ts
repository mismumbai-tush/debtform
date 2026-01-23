
import { BranchData } from './types';

export const BRANCH_SALES_MAPPING: BranchData = {
  "Mumbai": ["Vishal Ambhore","Amit Korgaonkar", "Santosh Pachratkar", "Rakesh Jain", "Kamlesh Sutar", "Pradeep Jadhav"],
  "Ulasnagar": ["Sachin Bhosle","Shiv Ratan (Shivam)", "Viay Sutar"],
  "Kolkata": ["Rajesh Jain"],
  "Jaipur": ["Durgesh Bhati"],
  "Ludhiana": ["Mahesh Chandeliya"],
  "Delhi": ["Vinay Chhajer", "Lalit Maroo", "Anish Jain", "Suresh Nautiyal", "Rahul Vashishtha", "Mohit Sharma"],
  "Ahmedabad": ["ravindra kaushik"],
  "Bangalore": ["Murali Krishna", "Balasubramanyam", "Tarachand"],
  "Tirupur": ["Ravi Varman","Alexander Pushkin", "Subramanian", "Mani Maran"],
  "Surat": ["Piyush Baid","Anil Marthe", "Raghuveer Darbar", "Sailesh Pathak", "Vanraj Darbar"]
};

export const BRANCHES = Object.keys(BRANCH_SALES_MAPPING);

export const GINZA_COLORS = {
  primary: '#000000',
  secondary: '#ed1c24', // Standard red from the logo style
  accent: '#71717a'
};
