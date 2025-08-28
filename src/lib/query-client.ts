import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5分間は新鮮とみなす
      gcTime: 1000 * 60 * 10, // 10分間キャッシュを保持
      retry: 1, // 失敗時の再試行回数
      refetchOnWindowFocus: false, // ウィンドウフォーカス時の再取得を無効化
    },
    mutations: {
      retry: 1, // ミューテーション失敗時の再試行回数
    },
  },
})
