import { formatInr } from "@/lib/money";

export const PriceTag = ({ price, mrp }: { price: number; mrp?: number }) => (
  <div className="flex items-center gap-2">
    <span className="text-lg font-semibold text-gray-900">
      {formatInr(price)}
    </span>
    {mrp && mrp > price ? (
      <span className="text-sm text-gray-400 line-through">
        {formatInr(mrp)}
      </span>
    ) : null}
  </div>
);
