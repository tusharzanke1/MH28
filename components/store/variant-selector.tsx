import { Button } from "@/components/ui/button";

export type VariantOption = {
  id: string;
  label: string;
  disabled?: boolean;
};

export const VariantSelector = ({
  label,
  options,
}: {
  label: string;
  options: VariantOption[];
}) => (
  <div className="space-y-2">
    <p className="text-sm font-medium text-gray-700">{label}</p>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Button
          key={option.id}
          type="button"
          variant="outline"
          disabled={option.disabled}
          className="rounded-full text-xs"
        >
          {option.label}
        </Button>
      ))}
    </div>
  </div>
);
