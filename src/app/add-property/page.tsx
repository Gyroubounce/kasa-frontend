// app/add-property/page.tsx
import { redirect } from "next/navigation";
import AddPropertyContent from "./AddPropertyContent";
import { getMe } from "@/lib/api/auth";

export default async function AddPropertyPage() {
  let me;

  try {
    me = await getMe();
  } catch {
    redirect("/login");
  }

  if (!me?.user) {
    redirect("/login");
  }

  if (me.user.role !== "owner" && me.user.role !== "admin") {
    redirect("/unauthorized");
  }

  return <AddPropertyContent user={me.user} />;
}
