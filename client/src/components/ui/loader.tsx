import { cn } from "@/lib/utils";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

export function Loader({ size = "md", className, ...props }: LoaderProps) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  };

  return (
    <img
      src="/images/icons/loader.svg"
      alt="Loading..."
      {...props}
      className={cn("animate-spin", sizeClasses[size])}
    />
  );
}
