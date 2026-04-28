// app/add-property/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AddPropertyContent from "./AddPropertyContent";
import { getMeServer } from "@/lib/api/auth-server";

export default async function Page() {
  // 1) Lire le cookie HTTP-only côté serveur
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // 2) Si pas de cookie → redirection serveur
  if (!token) {
    redirect("/login");
  }

  // 3) Appeler ton backend pour récupérer l'utilisateur
  const user = await getMeServer(token);

  // 4) Vérifier le rôle
  if (!user || user.role !== "owner") {
    redirect("/unauthorized");
  }

  // 5) Rendre la page avec user validé
  return <AddPropertyContent user={user} />;
}
