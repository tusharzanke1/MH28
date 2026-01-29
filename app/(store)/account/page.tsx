import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatusBadge } from "@/components/admin/status-badge";

export default function AccountPage() {
  return (
    <div className="container-page space-y-6">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-semibold">Your account</h1>
          <p className="text-sm text-gray-500">Manage orders and addresses</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold">Recent order</h3>
            <div className="mt-2 flex items-center justify-between rounded-2xl border border-gray-100 p-4">
              <div>
                <p className="font-medium">Order #MH28-1024</p>
                <p className="text-xs text-gray-500">2 items · ₹6,398</p>
              </div>
              <StatusBadge status="SHIPPED" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
