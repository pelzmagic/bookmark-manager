import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUser from "@/hooks/useUser";
import Spinner from "./Spinner";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  const { isPending, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate("/");
  }, [isAuthenticated, isPending, navigate]);

  if (isPending)
    return (
      <div className="bg-surface-muted flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );

  if (isAuthenticated) return children;
}
