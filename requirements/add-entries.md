# Adicionar Entrada monetária

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/entries/{categoryId}**
2. ✅ Valida se a requisição foi feita por um **usuário autenticado**
3. ✅ Valida o parâmetro **categoryId**
4. ✅ Valida os campos **value** e **description**
5. ✅ **Cria** uma movimentação com os dados fornecidos
6. ✅ Retorna **204**, sem dados

> ## Exceções

1. ✅ Retorna erro **400** se os campos obrigatórios não forem fornecidos pelo client
2. ✅ Retorna erro **403** se não for um usuário autenticado
3. ✅ Retorna erro **403** se o categoryId passado na URL for inválido
4. ✅ Retorna erro **404** se a API não existir
5. ✅ Retorna erro **500** se der erro ao tentar criar a movimentação
