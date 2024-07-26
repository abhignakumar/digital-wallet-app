import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export default async function () {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/api/auth/signin");

  return <div>Dashboard Page</div>;
}
