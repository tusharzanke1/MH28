import Image from "next/image";
import Link from "next/link";
import { PriceTag } from "@/components/store/price-tag";
import { Button } from "@/components/ui/button";

export type ProductCardProps = {
  slug: string;
  title: string;
  image: string;
  price: number;
  mrp?: number;
  brand: string;
};

export const ProductCard = ({ slug, title, image, price, mrp, brand }: ProductCardProps) => (
  <div className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-soft transition hover:-translate-y-1">
    <Link href={`/product/${slug}`} className="block">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition group-hover:scale-105"
        />
      </div>
      <div className="space-y-2 p-4">
        <p className="text-xs uppercase tracking-wide text-gray-400">{brand}</p>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <PriceTag price={price} mrp={mrp} />
      </div>
    </Link>
    <div className="px-4 pb-4">
      <Button className="w-full" type="button">
        Add to cart
      </Button>
    </div>
  </div>
);
