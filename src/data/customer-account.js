export const demoCustomer = {
  id: "customer-demo-001",
  name: "Salma Amrani",
  phone: "06 12 34 56 78",
  email: "salma.amrani@example.com",
  city: "Rabat",
  neighborhood: "Agdal",
  memberSince: "2025-04-12",
};

export const demoAddresses = [
  {
    id: "address-home-001",
    label: "Maison",
    city: "Rabat",
    neighborhood: "Agdal",
    address: "12 rue Jabal Oukaïmeden, résidence Alia, appartement 8",
    instructions: "Sonner chez Amrani, 2e étage.",
    isDefault: true,
  },
  {
    id: "address-office-001",
    label: "Bureau",
    city: "Rabat",
    neighborhood: "Hay Riad",
    address: "Immeuble Mahaj, avenue Annakhil, bureau 14",
    instructions: "Accueil principal, côté jardin.",
    isDefault: false,
  },
];

export const demoCustomerOrders = [
  {
    id: "order-hf-2026-1048",
    orderNumber: "HF-2026-1048",
    createdAt: "2026-10-01T10:05:00.000Z",
    items: [{ mealId: "tajine-poulet", name: "Tajine de poulet aux olives", image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=500&q=80", quantity: 2, unitPrice: 58, cookId: "khadija-b", cookName: "Khadija Bennis", cookImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&h=96&q=80" }],
    cook: { id: "khadija-b", name: "Khadija Bennis", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&h=96&q=80" },
    subtotal: 116,
    deliveryFee: 10,
    total: 126,
    deliveryAddress: { label: "Maison", city: "Rabat", neighborhood: "Agdal", address: "12 rue Jabal Oukaïmeden, résidence Alia, appartement 8", instructions: "Sonner chez Amrani, 2e étage." },
    deliveryTime: "12:30 – 13:00",
    paymentMethod: "Paiement à la livraison",
    status: "En préparation",
  },
  {
    id: "order-hf-2026-1032",
    orderNumber: "HF-2026-1032",
    createdAt: "2026-09-24T11:20:00.000Z",
    items: [{ mealId: "couscous-legumes", name: "Couscous aux sept légumes", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=500&q=80", quantity: 1, unitPrice: 65, cookId: "samira-e", cookName: "Samira El Mansouri", cookImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=96&h=96&q=80" }],
    cook: { id: "samira-e", name: "Samira El Mansouri", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=96&h=96&q=80" },
    subtotal: 65,
    deliveryFee: 10,
    total: 75,
    deliveryAddress: { label: "Maison", city: "Rabat", neighborhood: "Agdal", address: "12 rue Jabal Oukaïmeden, résidence Alia, appartement 8", instructions: "Sonner chez Amrani, 2e étage." },
    deliveryTime: "13:00 – 13:30",
    paymentMethod: "Paiement à la livraison",
    status: "Livrée",
  },
];

export const emptyFavorites = [];