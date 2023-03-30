   
   
const NAV_ITEMS = [
  {
    label: "Accueil",
    href: "/",
  },
  {
    label: "Catégories",
    children: [
      {
        label: "Hommes",
        href: "/Hommes",
      },
      {
        label: "Femmes",
        href: "/Femmes",
      },
      {
        label: "Enfants",
        href: "/Enfants",
      },
    ],
  },

  {
    label: "Panier",
    href: "/Cart",
  },
  {
    label: "Services",
    href: "#",
  },
  {
    label: "Paiements",
    children: [
      {
        label: "Ajouter moyen de paiements",
        href: "#",
      },
      {
        label: "Voir les moyens de paiements",
        href: "#",
      },
    ],
  },
];
