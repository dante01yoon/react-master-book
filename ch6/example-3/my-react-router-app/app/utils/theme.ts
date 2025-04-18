/**
 * React Router 예제를 위한 디자인 시스템
 *
 * 이 파일은 애플리케이션 전체의 일관된 모양과 느낌을 유지하기 위한
 * 디자인 토큰과 유틸리티 함수를 포함하고 있습니다.
 */

export const theme = {
  colors: {
    primary: 'text-blue-600 dark:text-blue-400',
    primaryHover: 'hover:text-blue-800 dark:hover:text-blue-300',
    secondary: 'text-purple-600 dark:text-purple-400',
    secondaryHover: 'hover:text-purple-800 dark:hover:text-purple-300',
    accent: 'text-amber-500 dark:text-amber-400',
    success: 'text-emerald-600 dark:text-emerald-400',
    error: 'text-red-600 dark:text-red-400',
    background: 'bg-white dark:bg-gray-900',
    card: 'bg-white dark:bg-gray-800',
    cardHover: 'hover:bg-gray-50 dark:hover:bg-gray-700',
  },
  text: {
    heading: 'text-gray-900 dark:text-white',
    body: 'text-gray-700 dark:text-gray-200',
    muted: 'text-gray-500 dark:text-gray-400',
  },
  layout: {
    container: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',
    card: 'rounded-lg shadow-md p-6',
    section: 'my-8',
  },
  components: {
    button: {
      base: 'rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition',
      primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
      secondary: 'bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500',
      ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white',
      sizes: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
      },
    },
    input: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white',
    label: 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1',
    code: 'font-mono text-sm bg-gray-100 dark:bg-gray-800 p-0.5 rounded',
  },
  effects: {
    cardHover: 'transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg',
  },
};

/**
 * 여러 Tailwind 클래스를 지능적으로 결합합니다
 */
export function cx(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * 변형과 크기에 따라 버튼 클래스를 가져옵니다
 */
export function getButtonClasses(variant: 'primary' | 'secondary' | 'ghost' = 'primary', size: 'sm' | 'md' | 'lg' = 'md'): string {
  return cx(
    theme.components.button.base,
    theme.components.button[variant] as string,
    theme.components.button.sizes[size]
  );
} 