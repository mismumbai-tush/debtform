
export interface CustomerEnquiry {
  srNo: number;
  customerName: string;
  enquiry: string;
}

export interface EnquiryFormData {
  date: string;
  branchName: string;
  salesPersonName: string;
  enquiries: CustomerEnquiry[];
}

export interface BranchData {
  [key: string]: string[];
}
