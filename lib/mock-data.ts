export type ProjectStatus = 'planning' | 'started' | 'half_completed' | 'last_stage' | 'completed';

export interface Client {
  id: string;
  name: string;
  company_name: string;
  email: string;
  phone: string;
  location: string;
  created_at: string;
}

export interface Project {
  id: string;
  client_id: string;
  project_name: string;
  site_location: string;
  total_budget: number;
  advance_payment: number;
  total_paid: number;
  remaining_payment: number;
  status: ProjectStatus;
  start_date: string;
  created_by: string;
  created_at: string;
}

export interface Payment {
  id: string;
  project_id: string;
  amount: number;
  payment_date: string;
  notes: string;
  created_at: string;
}

export interface DailyLog {
  id: string;
  project_id: string;
  log_date: string;
  description: string;
  created_by: string;
  created_at: string;
}

export const mockClients: Client[] = [
  { id: "c1", name: "Rahul Sharma", company_name: "Emaar Properties", email: "rahul@emaar.com", phone: "9876543210", location: "Dubai", created_at: "2023-01-01T00:00:00Z" },
  { id: "c2", name: "Priya Singh", company_name: "Godrej Industries", email: "priya@godrej.com", phone: "9876543211", location: "Mumbai", created_at: "2023-01-02T00:00:00Z" },
  { id: "c3", name: "Amit Patel", company_name: "Apex Commercial", email: "amit@apex.com", phone: "9876543212", location: "London", created_at: "2023-01-03T00:00:00Z" },
  { id: "c4", name: "Neha Gupta", company_name: "Riverside Dev Group", email: "neha@riverside.com", phone: "9876543213", location: "New York", created_at: "2023-01-04T00:00:00Z" },
  { id: "c5", name: "Vikram Reddy", company_name: "L&T Infrastructure", email: "vikram@lt.com", phone: "9876543214", location: "Chennai", created_at: "2023-01-05T00:00:00Z" }
];

export const projectsDirectory: Project[] = [
  { id: "p1", client_id: "c1", project_name: "Al-Noor HVAC Install", site_location: "Dubai, UAE", total_budget: 450000, advance_payment: 100000, total_paid: 325000, remaining_payment: 125000, status: "started", start_date: "2023-06-01", created_by: "u1", created_at: "2023-05-15T00:00:00Z" },
  { id: "p2", client_id: "c2", project_name: "Godrej Factory Fire Sprinklers", site_location: "Mumbai, India", total_budget: 280000, advance_payment: 50000, total_paid: 235000, remaining_payment: 45000, status: "half_completed", start_date: "2023-07-01", created_by: "u1", created_at: "2023-06-10T00:00:00Z" },
  { id: "p3", client_id: "c3", project_name: "Central Hub MEP Retrofit", site_location: "London, UK", total_budget: 1200000, advance_payment: 0, total_paid: 0, remaining_payment: 1200000, status: "planning", start_date: "2023-08-01", created_by: "u1", created_at: "2023-07-20T00:00:00Z" },
  { id: "p4", client_id: "c4", project_name: "Riverside Cooling Tower", site_location: "New York, USA", total_budget: 890000, advance_payment: 200000, total_paid: 890000, remaining_payment: 0, status: "completed", start_date: "2023-09-01", created_by: "u1", created_at: "2023-08-15T00:00:00Z" },
  { id: "p5", client_id: "c5", project_name: "Chennai Port Expansion", site_location: "Chennai, India", total_budget: 3500000, advance_payment: 1000000, total_paid: 3000000, remaining_payment: 500000, status: "last_stage", start_date: "2023-10-01", created_by: "u1", created_at: "2023-09-10T00:00:00Z" },
];

export const projectLogs: Record<string, DailyLog[]> = {
  "p1": [
    { id: "l1", project_id: "p1", log_date: "2023-10-12", description: "Completed initial site assessment for HVAC routing.", created_by: "u1", created_at: "2023-10-12T10:00:00Z" },
    { id: "l2", project_id: "p1", log_date: "2023-10-15", description: "Main ducts and cooling units delivered to site.", created_by: "u1", created_at: "2023-10-15T14:30:00Z" },
  ],
  "p2": [
    { id: "l3", project_id: "p2", log_date: "2023-11-01", description: "Started installation of main sprinkler pipes.", created_by: "u1", created_at: "2023-11-01T09:15:00Z" },
  ]
};

export const statsData = {
  totalRevenue: 4825000,
  outstandingDues: 812000,
  recentPayments: 340000
};

export const outstandingDuesList = [
  { id: 1, client: "Reliance MEP", invoice: "INV-2023-089", amount: 450000 },
  { id: 2, client: "Tata Projects", invoice: "INV-2023-112", amount: 210000 },
  { id: 3, client: "Shapoorji Pallonji", invoice: "INV-2023-145", amount: 152000 }
];

export const activeProjects = projectsDirectory.filter(p => p.status !== 'completed').slice(0, 3);
