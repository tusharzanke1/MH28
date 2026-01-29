import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { slugify } from "../lib/slug";

const prisma = new PrismaClient();

const main = async () => {
  const adminPassword = await hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@mh28.local" },
    update: {},
    create: {
      name: "MH28 Admin",
      email: "admin@mh28.local",
      passwordHash: adminPassword,
      role: "ADMIN",
    },
  });

  const categoryNames = ["Sarees", "Kurtas", "Dresses", "Activewear"];
  const categories = await Promise.all(
    categoryNames.map((name) =>
      prisma.category.upsert({
        where: { slug: slugify(name) },
        update: {},
        create: { name, slug: slugify(name) },
      })
    )
  );

  const product = await prisma.product.upsert({
    where: { slug: "rose-gold-anarkali" },
    update: {},
    create: {
      title: "Rose Gold Anarkali Set",
      slug: "rose-gold-anarkali",
      description:
        "An elegant anarkali set with soft shimmer, perfect for festive evenings.",
      brand: "MH28 Atelier",
      tags: ["festive", "embroidered"],
      categoryId: categories[1].id,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
            alt: "Rose Gold Anarkali",
          },
        ],
      },
      variants: {
        create: [
          { size: "S", color: "Rose", sku: "RG-AK-S", mrp: 4299, price: 3499, stock: 12 },
          { size: "M", color: "Rose", sku: "RG-AK-M", mrp: 4299, price: 3499, stock: 8 },
        ],
      },
    },
  });

  await prisma.banner.createMany({
    data: [
      {
        title: "Festive Edit",
        subtitle: "Glow-ready kurta sets",
        imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
        linkUrl: `/product/${product.slug}`,
      },
      {
        title: "New Season Sarees",
        subtitle: "Chiffon & organza picks",
        imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
        linkUrl: `/category/${categories[0].slug}`,
      },
    ],
  });

  console.log("Seeded admin:", admin.email);
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
