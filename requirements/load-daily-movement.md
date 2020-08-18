# Consultar movimentação diária

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **GET** na rota **/api/daily-movement**
2. ✅ Valida se a requisição foi feita por um **usuário autenticado**
3. ✅ Retorna a movimentação do **dia que a solicação é realizada**
4. ✅ Retorna a movimentação de uma **data específica**, se informada
5. ✅ Retorna o **saldo total** do usuário
6. ✅ Retorna o **id** e **nome** da categoria da movimentação
7. ✅ Retorna **200** com os dados da movimentação diária

> ## Exceções

1. ✅ Retorna erro **400** se a data inserida for inválida
2. ✅ Retorna erro **403** se não for um usuário autenticado
3. ✅ Retorna erro **404** se a API não existir
4. ✅ Retorna erro **500** se der erro ao tentar consultar a movimentação diária
