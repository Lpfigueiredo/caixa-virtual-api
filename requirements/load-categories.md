# Listar categorias

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **GET** na rota **/api/categories**
2. ✅ Valida se a requisição foi feita por um **usuário autenticado**
3. ✅ Retorna **204** se não tiver nenhuma categoria
4. ✅ Retorna **200** com os dados das categorias

> ## Exceções

1. ✅ Retorna erro **403** se não for um usuário autenticado
2. ✅ Retorna erro **404** se a API não existir
3. ✅ Retorna erro **500** se der erro ao tentar listar as categorias
