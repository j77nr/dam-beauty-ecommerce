export const SITE = {
  name: "DAM",
  tagline: "Beauty & Cosmetics",
  city: "Lomé, Togo",
  address: "Quartier Administratif, Lomé — Togo",
  phone: "+228 98 14 54 29",
  phoneRaw: "22898145429",
  email: "akakpodeborah1@gmail.com",
  whatsapp: "https://wa.me/22898145429",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  tiktok: "https://tiktok.com",
};

export type Category = "capillaire" | "visage" | "naturel";

export interface Product {
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  category: Category;
  image: string;
  short: string;
  description: string;
  ingredients: string[];
  usage: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: "elixir-capillaire-precieux",
    name: "Élixir Capillaire Précieux",
    subtitle: "Soin intense & brillance",
    price: 15000,
    category: "capillaire",
    image: "/products/product-hair-oil.jpg",
    short: "Une huile multi-actifs qui répare, nourrit et illumine la fibre capillaire dès la première application.",
    description:
      "Notre Élixir Capillaire Précieux est conçu pour les cheveux secs, abîmés ou en demande de soin profond. Sa formule légère, non-grasse, pénètre instantanément pour restaurer la brillance et la souplesse, tout en protégeant des agressions du climat équatorial.",
    ingredients: ["Huile de ricin noir du Togo", "Huile d'argan", "Vitamine E", "Ylang-ylang"],
    usage: "Appliquer quelques gouttes sur cheveux secs ou humides, en insistant sur les pointes. Utilisation quotidienne possible.",
  },
  {
    slug: "creme-hydratante-eclat",
    name: "Crème Hydratante Éclat",
    subtitle: "Visage & décolleté",
    price: 12500,
    category: "visage",
    image: "/products/product-cream.jpg",
    short: "Une crème jour fondante qui hydrate, unifie et révèle l'éclat naturel de la peau.",
    description:
      "Formulée à partir d'actifs botaniques sélectionnés, cette crème offre une hydratation longue durée sans effet gras. Elle apaise les peaux sensibilisées par la chaleur et lisse le grain de peau pour un teint frais au quotidien.",
    ingredients: ["Acide hyaluronique", "Beurre de karité bio", "Aloe vera", "Niacinamide 4%"],
    usage: "Appliquer matin et soir sur peau propre, en mouvements circulaires du centre du visage vers l'extérieur.",
  },
  {
    slug: "masque-reparateur-karite",
    name: "Masque Réparateur Karité",
    subtitle: "Nutrition profonde",
    price: 8000,
    category: "capillaire",
    image: "/products/product-mask.jpg",
    short: "Un masque hebdomadaire ultra-nourrissant pour cheveux assoiffés et fragilisés.",
    description:
      "Riche en beurre de karité brut et en huiles précieuses, ce masque restaure la fibre en profondeur, dompte les frisottis et redonne du corps aux cheveux les plus secs.",
    ingredients: ["Beurre de karité non raffiné", "Huile de coco", "Protéines de soie", "Miel"],
    usage: "Appliquer sur cheveux humides, longueurs et pointes. Laisser poser 15 à 20 minutes puis rincer abondamment.",
  },
  {
    slug: "serum-anti-imperfections",
    name: "Sérum Anti-Imperfections",
    subtitle: "Purifiant & apaisant",
    price: 18000,
    category: "visage",
    image: "/products/product-serum.jpg",
    short: "Un sérum ciblé qui régule, purifie et apaise les peaux mixtes à imperfections.",
    description:
      "Sa texture fluide pénètre rapidement pour réduire visiblement les imperfections, resserrer les pores et harmoniser le teint. Utilisable en cure ou au quotidien.",
    ingredients: ["Acide salicylique 2%", "Niacinamide", "Centella asiatica", "Tea tree"],
    usage: "Appliquer le soir sur peau propre, avant la crème hydratante. Éviter le contour des yeux.",
  },
  {
    slug: "huile-baobab-pure",
    name: "Huile de Baobab Pure",
    subtitle: "Multi-usages corps & cheveux",
    price: 9500,
    category: "naturel",
    image: "/products/product-hair-oil.jpg",
    short: "Une huile végétale 100% pure, pressée à froid, riche en oméga 3, 6 et 9.",
    description:
      "Trésor de l'Afrique de l'Ouest, l'huile de baobab nourrit, assouplit et raffermit. Elle s'utilise sur le corps, le visage et les cheveux pour un soin polyvalent et naturel.",
    ingredients: ["100% huile de baobab pressée à froid"],
    usage: "Appliquer en massage sur peau et cheveux. Idéale sortie de douche.",
  },
  {
    slug: "savon-noir-artisanal",
    name: "Savon Noir Artisanal",
    subtitle: "Purifie & exfolie",
    price: 3500,
    category: "naturel",
    image: "/products/product-mask.jpg",
    short: "Un savon traditionnel ouest-africain qui nettoie en douceur et révèle l'éclat de la peau.",
    description:
      "Fabriqué à la main selon une recette ancestrale, le savon noir purifie en profondeur sans agresser. Il convient à tous les types de peaux et de cheveux.",
    ingredients: ["Cendres de cabosses de cacao", "Huile de palmiste", "Beurre de karité"],
    usage: "Faire mousser entre les mains, appliquer sur peau humide, rincer abondamment.",
  },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  content: string;
}

export const POSTS: BlogPost[] = [
  {
    slug: "5-etapes-boucles-definies",
    title: "5 étapes pour des boucles parfaitement définies",
    excerpt:
      "Le rituel capillaire qui transforme vos boucles : routine simple, gestes précis, produits ciblés pour une définition longue durée.",
    category: "Soin capillaire",
    date: "2026-05-14",
    image: "/products/blog-hair.jpg",
    content:
      "Des boucles bien définies commencent par une bonne hydratation. La technique du LOC (Liquid, Oil, Cream) reste l'une des plus efficaces sous climat équatorial. Commencez par vaporiser de l'eau ou un spray hydratant, scellez l'hydratation avec une huile légère comme l'huile de jojoba, puis appliquez une crème coiffante. Travaillez vos boucles mèche par mèche pour une définition optimale, puis laissez sécher à l'air libre ou utilisez un diffuseur à basse température.",
  },
  {
    slug: "teint-eclatant-toute-annee",
    title: "Le secret d'un teint éclatant toute l'année",
    excerpt:
      "Sous le climat de Lomé, la peau a besoin d'un soin ciblé. Découvrez les gestes essentiels pour un éclat sans compromis.",
    category: "Cosmétique visage",
    date: "2026-05-02",
    image: "/products/blog-skincare.jpg",
    content:
      "La clé d'un teint lumineux réside dans la régularité plus que dans la quantité de produits. Un nettoyage doux matin et soir, un sérum vitamine C le matin, une crème hydratante adaptée à votre type de peau et une protection solaire SPF 30 minimum suffisent à transformer votre peau en quelques semaines. N'oubliez pas l'exfoliation enzymatique une à deux fois par semaine pour libérer l'éclat.",
  },
  {
    slug: "karite-brut-vertus",
    title: "Les vertus insoupçonnées du beurre de karité brut",
    excerpt:
      "Pourquoi le karité non-raffiné, encore appelé l'or des femmes, reste l'allié beauté indétrônable du continent.",
    category: "Conseils",
    date: "2026-04-22",
    image: "/products/blog-karite.jpg",
    content:
      "Le beurre de karité brut conserve l'ensemble de ses actifs : insaponifiables, vitamines A, D, E et F, acides gras essentiels. Là où le karité raffiné a perdu jusqu'à 80% de ses propriétés, le karité brut nourrit, répare, protège et apaise. Idéal pour les peaux sèches, les cheveux abîmés, les vergetures et même comme baume après-soleil.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Depuis que j'utilise l'Élixir Capillaire, mes cheveux ont retrouvé une brillance que je n'avais plus depuis des années. Un vrai coup de cœur.",
    author: "Sophie M.",
    role: "Cliente depuis 2024",
  },
  {
    quote:
      "Le savon noir DAM a totalement changé ma routine. Ma peau respire enfin, et le service est aux petits soins.",
    author: "Kossi A.",
    role: "Lomé",
  },
  {
    quote:
      "Des produits sérieux, une équipe à l'écoute, des conseils précis. DAM est devenu ma référence beauté à Lomé.",
    author: "Aïcha B.",
    role: "Fidèle depuis 2023",
  },
  {
    quote:
      "Le masque karité est une merveille. Mes cheveux sont nourris, doux, et la texture du produit est sublime.",
    author: "Lina K.",
    role: "Cliente régulière",
  },
];

export const FAQS = [
  {
    q: "Vos produits sont-ils adaptés à tous les types de peau ?",
    a: "Oui. Chaque formule DAM est conçue pour respecter la barrière cutanée. Pour les peaux très sensibles, nous recommandons toujours un test dans le creux du coude 24 h avant la première application.",
  },
  {
    q: "Comment passer commande ?",
    a: "Vous pouvez nous contacter directement via WhatsApp, par téléphone ou via le formulaire de contact. Nous confirmons votre commande sous 24 h et organisons la livraison ou le retrait à Lomé.",
  },
  {
    q: "Livrez-vous en dehors de Lomé ?",
    a: "Oui, nous livrons partout au Togo. Pour les commandes internationales, contactez-nous pour un devis personnalisé.",
  },
  {
    q: "Vos produits sont-ils naturels ?",
    a: "La majorité de nos produits sont formulés à partir d'ingrédients naturels, notamment des actifs ouest-africains comme le karité, le baobab et le ricin noir. Les compositions complètes sont disponibles sur chaque fiche produit.",
  },
  {
    q: "Quels sont les délais de livraison ?",
    a: "À Lomé, sous 24 à 48 h. Pour les autres villes du Togo, comptez 2 à 5 jours ouvrés.",
  },
  {
    q: "Proposez-vous des conseils personnalisés ?",
    a: "Absolument. Notre équipe répond à vos questions et vous guide dans le choix de votre routine, gratuitement, par WhatsApp ou en boutique.",
  },
];

export function formatPrice(p: number) {
  return `${p.toLocaleString("fr-FR")} FCFA`;
}

export function categoryLabel(c: Category) {
  if (c === "capillaire") return "Soins capillaires";
  if (c === "visage") return "Cosmétiques visage";
  return "Produits naturels";
}
