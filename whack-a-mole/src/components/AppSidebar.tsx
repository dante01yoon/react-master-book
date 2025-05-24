import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  // 아이콘을 사용하려면 해당 아이콘 컴포넌트를 임포트해야 합니다. 예:
  // Home as HomeIcon,
  // PuzzlePieceIcon,
  // ExclamationTriangleIcon,
} from "@/components/ui/sidebar";

// 각 라우트에 대한 정보를 정의함
const routes = [
  { path: "/", name: "홈", icon: null /* <HomeIcon className="size-4" /> */ },
  { path: "/memo", name: "메모 데모", icon: null /* <PuzzlePieceIcon className="size-4" /> */ },
  { path: "/compiler", name: "컴파일러 데모", icon: null /* <PuzzlePieceIcon className="size-4" /> */ },
  { path: "/error", name: "에러 페이지", icon: null /* <ExclamationTriangleIcon className="size-4" /> */ },
  {
    path: "/error-propagate",
    name: "에러 전파 테스트",
    icon: null, /* <ExclamationTriangleIcon className="size-4" /> */
  },
  {
    path: "/error-usecase",
    name: "에러 사용 사례",
    icon: null, /* <ExclamationTriangleIcon className="size-4" /> */
  },
  // 필요에 따라 여기에 더 많은 라우트를 추가할 수 있습니다.
];

export const AppSidebar = () => {
  const location = useLocation(); // 현재 위치 정보를 가져옴

  return (
    <Sidebar>
      {/* 사이드바 헤더 영역 시작 */}
      <SidebarHeader>
        <h2 className="px-2 py-1 text-lg font-semibold">두더지 잡기</h2> {/* 사이드바 제목 */}
      </SidebarHeader>
      {/* 사이드바 헤더 영역 끝 */}

      {/* 사이드바 콘텐츠 영역 시작 */}
      <SidebarContent>
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.path}>
              {/* SidebarMenuButton을 Link로 감싸서 네비게이션 기능을 추가함 */}
              {/* asChild 프롭을 사용하여 SidebarMenuButton의 스타일을 유지하면서 Link의 기능을 사용함 */}
              <SidebarMenuButton
                asChild
                isActive={location.pathname === route.path} // 현재 경로와 메뉴 경로가 일치하면 활성 상태로 표시함
                className="flex items-center gap-2" // 아이콘과 텍스트 정렬을 위한 클래스 추가
              >
                <Link to={route.path}>
                  {route.icon}{/* 메뉴 아이콘 (주석 처리됨) */}
                  <span>{route.name}</span> {/* 메뉴 이름 */}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      {/* 사이드바 콘텐츠 영역 끝 */}
    </Sidebar>
  );
};

AppSidebar.displayName = "AppSidebar"; 