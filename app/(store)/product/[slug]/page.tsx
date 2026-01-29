import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/data";
import { PriceTag } from "@/components/store/price-tag";
import { VariantSelector } from "@/components/store/variant-selector";
import { Button } from "@/components/ui/button";

export default async function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container-page grid gap-10 lg:grid-cols-2">
      <div className="grid gap-4">
        {product.images.map((image) => (
          <div key={image.id} className="relative h-96 overflow-hidden rounded-3xl">
            <Image src={image.url} alt={image.alt} fill className="object-cover" />
          </div>
        ))}
      </div>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            {product.brand}
          </p>
          <h1 className="text-3xl font-semibold text-gray-900">{product.title}</h1>
          <p className="text-sm text-gray-500">{product.category.name}</p>
        </div>
        <PriceTag price={product.variants[0]?.price ?? 0} mrp={product.variants[0]?.mrp} />
        <p className="text-sm text-gray-600">{product.description}</p>
        <VariantSelector
          label="Size"
          options={product.variants.map((variant) => ({
            id: variant.id,
            label: variant.size,
            disabled: variant.stock < 1,
          }))}
        />
        <VariantSelector
          label="Color"
          options={product.variants.map((variant) => ({
            id: variant.id,
            label: variant.color,
            disabled: variant.stock < 1,
          }))}
        />
        <div className="flex gap-4">
          <Button className="flex-1">Add to cart</Button>
          <Button variant="outline" className="flex-1">
            Wishlist
          </Button>
        </div>
      </div>
    </div>
  );
}
