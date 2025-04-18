import type { ButtonHTMLAttributes } from "react";
import { cx, getButtonClasses } from "../../utils/theme";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  className?: string;
}

/**
 * 다양한 변형과 크기를 가진 버튼 컴포넌트
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = cx(
    getButtonClasses(variant, size),
    isLoading ? "opacity-70 cursor-not-allowed" : "",
    className
  );

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>로딩중...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
} 