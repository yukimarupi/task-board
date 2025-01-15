// src/lib/logout.ts

export const logout = () => {
  // セッションストレージからJWTとユーザー情報を削除
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');

  // ログインページにリダイレクト
  window.location.href = '/login';
};

export default logout;
