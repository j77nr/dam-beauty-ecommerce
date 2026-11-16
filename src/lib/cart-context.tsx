import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";
interface CartItem { id: number; quantity: number; product: { id: number; name: string; price: number; image: string; slug: string }; }
interface CartContextType { items: CartItem[]; itemCount: number; total: number; loading: boolean; addToCart: (id: number, q?: number) => Promise<void>; removeFromCart: (id: number) => Promise<void>; updateQuantity: (id: number, q: number) => Promise<void>; refetch: () => Promise<void>; }
const CartContext = createContext<CartContextType | undefined>(undefined);
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const fetchCart = async () => { try { const res = await fetch("/api/cart"); if (res.ok) { const d = await res.json(); if (d.success) { setItems(d.cart.items); setItemCount(d.cart.itemCount); setTotal(d.cart.total); } } } catch { } finally { setLoading(false); } };
  useEffect(() => { fetchCart(); }, []);
  const addToCart = async (pid: number, q = 1) => { try { const res = await fetch("/api/cart/add", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ productId: pid, quantity: q }) }); const d = await res.json(); if (!d.success) throw new Error(d.error || "Erreur"); toast.success("Produit ajoute"); await fetchCart(); } catch (e: any) { toast.error(e.message || "Erreur"); } };
  const removeFromCart = async (id: number) => { try { const res = await fetch("/api/cart/remove", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ itemId: id }) }); const d = await res.json(); if (!d.success) throw new Error(d.error || "Erreur"); toast.success("Retire"); await fetchCart(); } catch (e: any) { toast.error(e.message || "Erreur"); } };
  const updateQuantity = async (id: number, q: number) => { try { const res = await fetch("/api/cart/update", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ itemId: id, quantity: q }) }); const d = await res.json(); if (!d.success) throw new Error(d.error || "Erreur"); await fetchCart(); } catch (e: any) { toast.error(e.message || "Erreur"); } };
  return (<CartContext.Provider value={{ items, itemCount, total, loading, addToCart, removeFromCart, updateQuantity, refetch: fetchCart }}>{children}</CartContext.Provider>);
}
export function useCart() { const c = useContext(CartContext); if (!c) throw new Error("useCart dans CartProvider"); return c; }