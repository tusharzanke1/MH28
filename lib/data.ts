import type {
  Banner,
  Category,
  Coupon,
  Order,
  Product,
  ProductImage,
  User,
  Variant,
} from "@prisma/client";

type ProductWithRelations = Product & {
  images: ProductImage[];
  variants: Variant[];
  category: Category;
};

type OrderWithUser = Order & { user: User };

const mockCategories: Category[] = [
  {
    id: "cat_sarees",
    name: "Sarees",
    slug: "sarees",
    createdAt: new Date(),
  },
  {
    id: "cat_kurtas",
    name: "Kurtas",
    slug: "kurtas",
    createdAt: new Date(),
  },
  {
    id: "cat_dresses",
    name: "Dresses",
    slug: "dresses",
    createdAt: new Date(),
  },
];

const mockProducts: ProductWithRelations[] = [
  {
    id: "prod_rose",
    title: "Rose Gold Anarkali Set",
    slug: "rose-gold-anarkali",
    description:
      "An elegant anarkali set with soft shimmer, perfect for festive evenings.",
    brand: "MH28 Atelier",
    tags: ["festive", "embroidered"],
    categoryId: "cat_kurtas",
    category: mockCategories[1],
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [
      {
        id: "img_rose",
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        alt: "Rose Gold Anarkali",
        productId: "prod_rose",
      },
    ],
    variants: [
      {
        id: "var_rose_s",
        productId: "prod_rose",
        size: "S",
        color: "Rose",
        sku: "RG-AK-S",
        mrp: 4299,
        price: 3499,
        stock: 12,
      },
      {
        id: "var_rose_m",
        productId: "prod_rose",
        size: "M",
        color: "Rose",
        sku: "RG-AK-M",
        mrp: 4299,
        price: 3499,
        stock: 8,
      },
    ],
  },
  {
    id: "prod_ivory",
    title: "Ivory Chiffon Saree",
    slug: "ivory-chiffon-saree",
    description: "Lightweight chiffon saree with subtle shimmer borders.",
    brand: "MH28 Heritage",
    tags: ["saree", "chiffon"],
    categoryId: "cat_sarees",
    category: mockCategories[0],
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [
      {
        id: "img_ivory",
        url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
        alt: "Ivory Chiffon Saree",
        productId: "prod_ivory",
      },
    ],
    variants: [
      {
        id: "var_ivory",
        productId: "prod_ivory",
        size: "Free",
        color: "Ivory",
        sku: "IV-SR-F",
        mrp: 3499,
        price: 2899,
        stock: 16,
      },
    ],
  },
];

const mockBanners: Banner[] = [
  {
    id: "banner_festive",
    title: "Festive Edit",
    subtitle: "Glow-ready kurta sets",
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    linkUrl: "/product/rose-gold-anarkali",
    createdAt: new Date(),
  },
  {
    id: "banner_sarees",
    title: "New Season Sarees",
    subtitle: "Chiffon & organza picks",
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    linkUrl: "/category/sarees",
    createdAt: new Date(),
  },
];

const mockUsers: User[] = [
  {
    id: "user_jaya",
    name: "Jaya Patel",
    email: "jaya@mh28.local",
    passwordHash: null,
    role: "CUSTOMER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockOrders: OrderWithUser[] = [
  {
    id: "order_1001",
    userId: "user_jaya",
    status: "SHIPPED",
    totalAmount: 6398,
    createdAt: new Date(),
    updatedAt: new Date(),
    user: mockUsers[0],
  },
];

const mockCoupons: Coupon[] = [
  {
    id: "coupon_festive",
    code: "FESTIVE500",
    type: "FLAT",
    value: 500,
    minOrder: 2999,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    usageLimit: 100,
  },
];

const useMockData = () => !process.env.DATABASE_URL;

const withPrisma = async <T>(handler: (prisma: typeof import("./prisma").prisma) => Promise<T>, fallback: T) => {
  if (useMockData()) {
    return fallback;
  }
  try {
    const { prisma } = await import("./prisma");
    return await handler(prisma);
  } catch (error) {
    console.warn("Falling back to mock data:", error);
    return fallback;
  }
};

export const getBanners = async () =>
  withPrisma(
    (prisma) => prisma.banner.findMany({ take: 2 }),
    mockBanners
  );

export const getCategories = async () =>
  withPrisma((prisma) => prisma.category.findMany(), mockCategories);

export const getProducts = async () =>
  withPrisma(
    (prisma) =>
      prisma.product.findMany({
        include: { images: true, variants: true },
        take: 6,
        orderBy: { createdAt: "desc" },
      }),
    mockProducts
  );

export const getCategoryBySlug = async (slug: string) =>
  withPrisma(
    (prisma) => prisma.category.findUnique({ where: { slug } }),
    mockCategories.find((category) => category.slug === slug) ?? null
  );

export const getProductsByCategory = async (categoryId?: string | null) =>
  withPrisma(
    (prisma) =>
      prisma.product.findMany({
        where: { categoryId: categoryId ?? undefined },
        include: { images: true, variants: true },
      }),
    categoryId
      ? mockProducts.filter((product) => product.categoryId === categoryId)
      : mockProducts
  );

export const searchProducts = async (query: string) =>
  withPrisma(
    (prisma) =>
      prisma.product.findMany({
        where: query
          ? { title: { contains: query, mode: "insensitive" } }
          : undefined,
        include: { images: true, variants: true },
      }),
    query
      ? mockProducts.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
      : mockProducts
  );

export const getProductBySlug = async (slug: string) =>
  withPrisma(
    (prisma) =>
      prisma.product.findUnique({
        where: { slug },
        include: { images: true, variants: true, category: true },
      }),
    mockProducts.find((product) => product.slug === slug) ?? null
  );

export const getAdminMetrics = async () =>
  withPrisma(
    async (prisma) => {
      const [orders, products] = await Promise.all([
        prisma.order.count(),
        prisma.product.count(),
      ]);
      return { orders, products };
    },
    { orders: mockOrders.length, products: mockProducts.length }
  );

export const getAdminProducts = async () =>
  withPrisma(
    (prisma) =>
      prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" },
      }),
    mockProducts
  );

export const getAdminOrders = async () =>
  withPrisma(
    (prisma) =>
      prisma.order.findMany({
        include: { user: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
    mockOrders
  );

export const getAdminCustomers = async () =>
  withPrisma(
    (prisma) =>
      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
    mockUsers
  );

export const getAdminCoupons = async () =>
  withPrisma(
    (prisma) => prisma.coupon.findMany({ orderBy: { expiresAt: "desc" } }),
    mockCoupons
  );

export const getAdminBanners = async () =>
  withPrisma(
    (prisma) => prisma.banner.findMany({ orderBy: { createdAt: "desc" } }),
    mockBanners
  );
