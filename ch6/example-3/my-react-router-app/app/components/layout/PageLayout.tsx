import type { ReactNode } from "react";
import { Link } from "react-router";
import { cx, theme } from "../../utils/theme";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  backLink?: { to: string; label: string };
  className?: string;
}

/**
 * 일관된 페이지 구조를 위한 페이지 레이아웃 컴포넌트
 */
export function PageLayout({
  children,
  title,
  description,
  backLink,
  className = "",
}: PageLayoutProps) {
  return (
    <div className={cx(theme.layout.container, "py-8", className)}>
      <div className="mb-8">
        {backLink && (
          <Link
            to={backLink.to}
            className={cx(
              "inline-flex items-center mb-4",
              theme.colors.primary,
              theme.colors.primaryHover
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            {backLink.label}
          </Link>
        )}
        <h1 className={cx("text-3xl font-bold", theme.text.heading)}>{title}</h1>
        {description && (
          <p className={cx("mt-2", theme.text.body)}>
            {description}
          </p>
        )}
      </div>
      
      <div className="content">{children}</div>
    </div>
  );
} 