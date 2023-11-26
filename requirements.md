### entidades

CONTA
MESA
CARDAPIO

## Funcionalidades do usuário restaurante

- CRUD de **CARDAPIO**
- CRUD de **CONTA**
- WEBSOCKET - Receber pedidos
  - adicionar quando chega o pedido a **CONTA** do cliente
  - atualizar o status do pedido na conta PENDENTE, PREPARANDO E ENTREGUE

## Funcionalidades do usuário mesa

- Leitura de QR para ingressar na mesa
  - vai ser criado uma **MESA** com o nome do usuário

- WEBSOCKET Realizar um pedido
  - usuário pode pedir um produto do cardapio para a mesa
  - alterar um pedido já adicionado na conta se estiver PENDENTE

- POST fechar conta
  - Divisão da conta por quantidade de pessoa
  - Divisão por consumo
