# TODO - Exclusão definitiva de usuário (delete)

- [x] Implementar backend: endpoint `DELETE /auth/excluir-conta` protegido por authMiddleware

- [x] Backend: criar service método `excluirConta(idUsuario)` que chama `prisma.usuario.delete`

- [x] Backend: adicionar handler no `AuthController`

- [x] Frontend: adicionar chamada no `frontend/src/services/api.js` (ex.: `excluirConta()`)

- [x] Frontend: conectar botão “Excluir conta” em `frontend/src/pages/Perfil.jsx` para chamar API e, ao sucesso, fazer `removerAuth()` + `navigate('/')`

- [ ] (Opcional) Rodar testes/linters e ajustar falhas
