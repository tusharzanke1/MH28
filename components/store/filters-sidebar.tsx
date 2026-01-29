import { Input } from "@/components/ui/input";

export const FiltersSidebar = () => (
  <aside className="space-y-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-soft">
    <div>
      <h4 className="text-sm font-semibold text-gray-900">Filter by</h4>
      <p className="text-xs text-gray-500">Category, price, size, color</p>
    </div>
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-600">Search</label>
      <Input placeholder="Search within category" />
    </div>
    <div className="space-y-2 text-xs text-gray-500">
      <p>• Price Range</p>
      <p>• Size</p>
      <p>• Color</p>
      <p>• Availability</p>
    </div>
  </aside>
);
