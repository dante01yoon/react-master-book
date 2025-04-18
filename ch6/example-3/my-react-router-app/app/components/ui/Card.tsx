import type { ReactNode } from "react";
import { cx, theme } from "../../utils/theme";

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  variant?: "default" | "outlined";
}

/**
 * 선택적 제목이 있는 상자에 콘텐츠를 표시하는 카드 컴포넌트
 */
export function Card({ 
  title, 
  children, 
  className = "", 
  hoverable = false,
  variant = "default"
}: CardProps) {
  const baseClasses = cx(
    theme.layout.card,
    variant === "default" ? theme.colors.card : "border border-gray-200 dark:border-gray-700",
    hoverable ? theme.effects.cardHover : "",
    className
  );

  return (
    <div className={baseClasses}>
      {title && (
        <h2 className={cx("text-xl font-semibold mb-4", theme.text.heading)}>
          {title}
        </h2>
      )}
      {children}
    </div>
  );
} 