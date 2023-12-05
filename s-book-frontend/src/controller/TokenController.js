
const TOKEN_PATH="S_BOOK_API_FRONTEND/token";

class TokenController {
    static saveToken(token) {
      // Salva o token no localStorage
      localStorage.setItem(TOKEN_PATH, token);
    }
  
    static getToken() {
      // Recupera o token do localStorage
      const token = localStorage.getItem(TOKEN_PATH);
  
      // Verifica se o token está presente e não expirou
      if (!token) {
        return null;
      }
  
      // Decodifica o token para verificar a expiração
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = decodedToken.exp * 1000; // Convertendo segundos para milissegundos
  
        // Verifica se o token expirou
        if (expirationTime < Date.now()) {
          // Token expirado, remove do localStorage
          localStorage.removeItem(TOKEN_PATH);
          return null;
        }
  
        // Token válido
        return token;
      } catch (error) {
        // Erro ao decodificar o token, considera como inválido
        localStorage.removeItem(TOKEN_PATH);
        return null;
      }
    }
  
    static logout() {
      // Remove o token do localStorage ao fazer logout
      localStorage.removeItem(TOKEN_PATH);
    }
  }
  
  export default TokenController;
  