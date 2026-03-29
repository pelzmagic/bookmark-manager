export default function Spinner({
  size = "sm",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      className={`${sizeClasses[size]} animate-spin rounded-full border-neutral-200 border-t-white`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
