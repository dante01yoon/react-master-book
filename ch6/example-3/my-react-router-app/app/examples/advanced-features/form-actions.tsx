import { Form, useActionData, useNavigation } from "react-router";
import { PageLayout } from "../../components/layout/PageLayout";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { cx, theme } from "../../utils/theme";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type ActionData = {
  errors?: {
    text?: string;
  };
  success?: boolean;
  todos?: Todo[];
};

/**
 * 폼 액션 예제
 * 
 * 이 예제는 폼 제출 및 데이터 변경을 처리하기 위한 React Router의 폼 액션을 보여줍니다.
 * 폼 액션은 서버(SSR 모드) 또는 브라우저(CSR 모드)에서 실행되며, 클라이언트 측
 * JavaScript 없이 폼 제출을 처리하는 깔끔한 방법을 제공합니다.
 */

// 시뮬레이션된 할일 데이터베이스
let TODOS: Todo[] = [
  { id: "1", text: "React Router 배우기", completed: false },
  { id: "2", text: "애플리케이션 빌드하기", completed: false },
];

// 폼 제출을 처리하는 액션 함수
export async function action({ request }: { request: Request }) {
  // 요청에서 폼 데이터를 가져옵니다
  const formData = await request.formData();
  const intent = formData.get("intent");
  
  // 다양한 폼 의도 처리
  if (intent === "create") {
    const text = formData.get("text") as string;
    
    // 폼 데이터 유효성 검사
    if (!text || text.length < 3) {
      return {
        errors: {
          text: "할일 텍스트는 최소 3자 이상이어야 합니다",
        },
        todos: TODOS,
      };
    }
    
    // 새 할일 생성
    const newTodo: Todo = {
      id: String(Date.now()),
      text,
      completed: false,
    };
    
    // "데이터베이스"에 추가
    TODOS = [...TODOS, newTodo];
    
    // 성공 반환
    return { success: true, todos: TODOS };
  }
  
  if (intent === "toggle") {
    const id = formData.get("id") as string;
    
    // 할일의 완료 상태 전환
    TODOS = TODOS.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    
    return { success: true, todos: TODOS };
  }
  
  if (intent === "delete") {
    const id = formData.get("id") as string;
    
    // 할일 제거
    TODOS = TODOS.filter(todo => todo.id !== id);
    
    return { success: true, todos: TODOS };
  }
  
  // 알 수 없는 의도
  return { success: false, todos: TODOS };
}

// 폼을 렌더링하는 컴포넌트
export default function FormActions() {
  // 액션이 반환한 데이터에 접근
  const actionData = useActionData() as ActionData | undefined;
  
  // 로딩 표시기를 표시하기 위한 네비게이션 상태 가져오기
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  // 액션 데이터에서 할일을 사용하거나 초기 할일로 기본 설정
  const todos = actionData?.todos || TODOS;

  return (
    <PageLayout
      title="폼 액션"
      description="React Router로 폼 제출 및 데이터 변경 처리하기"
      backLink={{ to: "/", label: "예제 목록으로 돌아가기" }}
    >
      <div className="space-y-8">
        <Card title="폼 액션 작동 방식" className="mb-8">
          <div className={cx("text-sm", theme.text.body)}>
            <p className="mb-2">
              폼 액션은 React Router에서 폼 제출을 처리합니다. 서버나 클라이언트에서 실행되며,
              폼 데이터를 처리하고 UI를 업데이트하기 위한 데이터를 반환합니다.
            </p>
            <p>
              아래에서 할일 추가, 전환, 삭제를 시도하여 폼 액션의 작동을 확인해보세요!
            </p>
          </div>
        </Card>
  
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card title="새 할일 추가">
              {/* 새 할일 추가 폼 */}
              <Form method="post" className="space-y-4">
                <div>
                  <label htmlFor="text" className={theme.components.label}>
                    할일 텍스트
                  </label>
                  <input 
                    type="text" 
                    id="text" 
                    name="text" 
                    className={cx(
                      theme.components.input,
                      actionData?.errors?.text ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    )}
                    placeholder="새 할일 입력"
                    aria-invalid={actionData?.errors?.text ? true : undefined}
                    aria-errormessage={actionData?.errors?.text ? "text-error" : undefined}
                    disabled={isSubmitting}
                  />
                  {actionData?.errors?.text && (
                    <div id="text-error" className={cx("mt-1 text-sm", theme.colors.error)}>
                      {actionData.errors.text}
                    </div>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  name="intent" 
                  value="create"
                  disabled={isSubmitting}
                  isLoading={isSubmitting && navigation.formData?.get("intent") === "create"}
                  className="w-full"
                >
                  할일 추가
                </Button>
              </Form>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card title="할일 목록" className="h-full">
              {/* 할일 목록 */}
              {todos.length === 0 ? (
                <div className={cx("text-center py-8", theme.text.muted)}>
                  아직 할일이 없습니다. 위에서 추가해보세요!
                </div>
              ) : (
                <ul className="divide-y">
                  {todos.map(todo => (
                    <li 
                      key={todo.id} 
                      className={cx(
                        "py-4 flex items-center justify-between", 
                        todo.completed ? "opacity-60" : ""
                      )}
                    >
                      <div className="flex items-center">
                        <div 
                          className={cx(
                            "w-2 h-2 rounded-full mr-3",
                            todo.completed ? "bg-green-500" : "bg-amber-500"
                          )}
                        />
                        <span className={cx(
                          theme.text.body,
                          todo.completed ? "line-through" : ""
                        )}>
                          {todo.text}
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Form method="post" className="inline">
                          <input type="hidden" name="id" value={todo.id} />
                          <Button 
                            type="submit" 
                            name="intent" 
                            value="toggle"
                            disabled={isSubmitting}
                            variant="ghost"
                            size="sm"
                          >
                            {todo.completed ? "취소" : "완료"}
                          </Button>
                        </Form>
                        
                        <Form method="post" className="inline">
                          <input type="hidden" name="id" value={todo.id} />
                          <Button 
                            type="submit" 
                            name="intent" 
                            value="delete"
                            disabled={isSubmitting}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                          >
                            삭제
                          </Button>
                        </Form>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 