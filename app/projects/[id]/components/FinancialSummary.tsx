import { DollarSign } from "lucide-react";

interface ProjectFinancials {
  totalBudget: string | null;
  advancePayment: string | null;
  totalPaid: number;
  remaining: number;
}

export function FinancialSummary({ project }: { project: ProjectFinancials }) {
  const budget = parseFloat(project.totalBudget ?? "0");
  const totalPaid = Number(project.totalPaid);
  const remaining = Number(project.remaining);
  const percentagePaid = budget > 0 ? (totalPaid / budget) * 100 : 0;

  return (
    <div className="bg-white border border-outline-variant p-6 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary-navy/10 rounded-full text-primary-navy">
          <DollarSign className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-serif text-primary-navy">Financial Summary</h3>
      </div>

      <div className="space-y-6 flex-1">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-on-surface-variant">Total Budget</span>
            <span className="font-mono text-on-surface font-semibold">
              ₹{budget.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-on-surface-variant">Advance Paid</span>
            <span className="font-mono text-green-600 font-semibold">
              ₹{parseFloat(project.advancePayment ?? "0").toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-on-surface-variant">Additional Payments</span>
            <span className="font-mono text-green-600 font-semibold">
              ₹{totalPaid.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm pt-4 border-t border-outline-variant mt-2">
            <span className="text-on-surface-variant font-medium">
              Remaining Balance
            </span>
            <span className="font-mono text-primary-navy font-bold">
              ₹{remaining.toLocaleString()}
            </span>
          </div>
        </div>

        
      </div>
    </div>
  );
}
