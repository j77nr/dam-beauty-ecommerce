import { createFileRoute, Navigate, Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/site-data";
import { Edit, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/produits")({
  head: () => ({
    meta: [{ title: "Gestion des produits — Admin" }],
  }),
  component: AdminProduitsPage,
});

interface Product {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  category: string;
  image: string;
  short: string;
  description: string;
  ingredients: string;
  usage: string;
  inStock: boolean;
}

function AdminProduitsPage() {
  const { user, loading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    subtitle: "",
    price: 0,
    category: "capillaire" as "capillaire" | "visage" | "naturel",
    image: "",
    short: "",
    description: "",
    ingredients: "",
    usage: "",
    inStock: true,
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchProducts();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="py-24 px-6 lg:px-10">
        <div className="container mx-auto text-center">
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  const resetForm = () => {
    setFormData({
      slug: "",
      name: "",
      subtitle: "",
      price: 0,
      category: "capillaire",
      image: "",
      short: "",
      description: "",
      ingredients: "",
      usage: "",
      inStock: true,
    });
    setEditingProduct(null);
    setIsCreating(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      slug: product.slug,
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      category: product.category as "capillaire" | "visage" | "naturel",
      image: product.image,
      short: product.short,
      description: product.description,
      ingredients: JSON.parse(product.ingredients).join(", "),
      usage: product.usage,
      inStock: product.inStock,
    });
    setIsCreating(false);
  };

  const handleCreate = () => {
    resetForm();
    setIsCreating(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ingredientsArray = formData.ingredients
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i.length > 0);

    const payload = {
      ...formData,
      ingredients: ingredientsArray,
    };

    try {
      if (editingProduct) {
        // Mise à jour
        const res = await fetch("/api/admin/products/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingProduct.id, ...payload }),
        });

        const data = await res.json();
        if (!data.success) throw new Error(data.error);

        toast.success("Produit mis à jour");
      } else {
        // Création
        const res = await fetch("/api/admin/products/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!data.success) throw new Error(data.error);

        toast.success("Produit créé");
      }

      resetForm();
      fetchProducts();
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de l'enregistrement");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;

    try {
      const res = await fetch("/api/admin/products/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      toast.success("Produit supprimé");
      fetchProducts();
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la suppression");
    }
  };

  return (
    <div className="py-24 px-6 lg:px-10">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="font-serif text-4xl lg:text-5xl mb-4">
              Gestion des produits
            </h1>
            <p className="text-muted-foreground">
              {products.length} produit{products.length > 1 ? "s" : ""} au catalogue
            </p>
          </div>
          <div className="flex gap-4">
            <Button onClick={handleCreate}>
              <Plus size={18} className="mr-2" />
              Nouveau produit
            </Button>
            <Link to="/admin">
              <Button variant="outline">Retour au dashboard</Button>
            </Link>
          </div>
        </div>

        {/* Formulaire d'édition/création */}
        {(isCreating || editingProduct) && (
          <div className="border border-accent bg-accent/5 p-8 mb-12">
            <h2 className="font-serif text-2xl mb-6">
              {editingProduct ? "Modifier le produit" : "Créer un produit"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Nom du produit *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug (URL) *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    required
                    className="mt-2"
                    placeholder="ex: serum-karite-pur"
                  />
                </div>

                <div>
                  <Label htmlFor="subtitle">Sous-titre *</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, subtitle: e.target.value }))
                    }
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="price">Prix (FCFA) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        price: parseFloat(e.target.value),
                      }))
                    }
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Catégorie *</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value as any,
                      }))
                    }
                    required
                    className="mt-2 w-full border border-border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="capillaire">Capillaire</option>
                    <option value="visage">Visage</option>
                    <option value="naturel">Naturel</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="image">URL de l'image *</Label>
                  <Input
                    id="image"
                    type="url"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, image: e.target.value }))
                    }
                    required
                    className="mt-2"
                    placeholder="https://..."
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="short">Description courte *</Label>
                  <Textarea
                    id="short"
                    value={formData.short}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, short: e.target.value }))
                    }
                    required
                    className="mt-2"
                    rows={2}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="description">Description complète *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    required
                    className="mt-2"
                    rows={4}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="ingredients">
                    Ingrédients (séparés par des virgules) *
                  </Label>
                  <Textarea
                    id="ingredients"
                    value={formData.ingredients}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        ingredients: e.target.value,
                      }))
                    }
                    required
                    className="mt-2"
                    rows={2}
                    placeholder="Beurre de karité, Huile d'argan, Vitamine E"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="usage">Mode d'emploi *</Label>
                  <Textarea
                    id="usage"
                    value={formData.usage}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, usage: e.target.value }))
                    }
                    required
                    className="mt-2"
                    rows={3}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    id="inStock"
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        inStock: e.target.checked,
                      }))
                    }
                    className="w-4 h-4"
                  />
                  <Label htmlFor="inStock">En stock</Label>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit">
                  {editingProduct ? "Mettre à jour" : "Créer le produit"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Annuler
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Liste des produits */}
        {productsLoading ? (
          <p className="text-center">Chargement...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border border-border p-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="font-serif text-xl mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {product.subtitle}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <p className="font-semibold text-lg">{formatPrice(product.price)}</p>
                  <Badge variant={product.inStock ? "default" : "destructive"}>
                    {product.inStock ? "En stock" : "Rupture"}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(product)}
                    className="flex-1"
                  >
                    <Edit size={16} className="mr-2" />
                    Modifier
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
