# Criar categoria

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/categories**
2. ✅ Valida se a requisição foi feita por um **usuário autenticado**
3. ✅ Valida dado obrigatório **name**
4. ✅ **Cria** uma categoria com os dados fornecidos
5. ✅ Retorna **204**, sem dados

> ## Exceções

1. ✅ Retorna erro **400** se name não for fornecido pelo client
2. ✅ Retorna erro **403** se o usuário não estiver autenticado
3. ✅ Retorna erro **404** se a API não existir
4. ✅ Retorna erro **500** se der erro ao tentar criar a categoria
