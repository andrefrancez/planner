## Planner

É um projeto inspirado no Tweek, projetado para ser um calendário semanal com funcionalidades específicas voltadas para a organização de eventos e tarefas. Ele permite que o usuário adicione lembretes em horários específicos, categorizados por prioridade, e associe observações a esses lembretes. Também é possível interagir com o ChatGPT.

## Funcionalidades Principais
### Front-end

Exibição semanal: Apresenta os 7 dias da semana, com horários divididos de 1 em 1 hora.
- Modal para lembretes: Permite adicionar, editar ou excluir lembretes com título e prioridade: Alta, Média e Baixa
- Observações: Adicione detalhes aos lembretes existentes.
- Navegação mensal: Altere o mês e ano exibidos.

### Back-end
- Microsserviços: Arquitetura baseada em dois microsserviços:
Reminders: Gerencia lembretes (CRUD completo).
Observations: Gerencia observações associadas aos lembretes.

- Barramento de eventos: Gerencia comunicação entre os microsserviços usando RabbitMQ.
- Integração com API do ChatGPT: Permite interações contextuais para ajustar lembretes e gerar ideias.

## Tecnologias Utilizadas

### Frontend

- React
- Bootstrap
- JavaScript

### Backend

- Node.js
- Express
- MySQL
- RabbitMQ

## Configuração do Projeto

### Backend

1. Instale as dependências com npm install em cada microsserviço.
2. Configure o RabbitMQ e MySQL no arquivo .env.
3. Inicie os microsserviços: node reminders/index.js e node observations/index.js

### Frontend

1. Instale as dependências com npm install.
2. Inicie o servidor de desenvolvimento: npm start

### Uso

1. Navegue até o frontend (http://localhost:3000).
2. Adicione lembretes e observações conforme necessário.
3. Use a interface para navegar entre meses e visualizar eventos.
