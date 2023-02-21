# A fazer:
- enviar notificações sobre serviços quando atualizados e criados
- enviar e-mails (se a configuração estiver ativada) sobre serviços atualizados e criados

## Backend:
- Manipulação/CRUD das entidades completo por meio dos padrões **REST** e **RESTful**
- **Banco de dados SQL Postgres** para relações mais complexas
- **ORM Prisma** para manipualação do banco de dados
- Desenvolvido com **Node** e **Typescript** para aumentar a robustez e clareza do código
- Segurança de senhas aprimoradas atráves da **criptografia**
- Code Style com **ESLint**
*- **Testes unitários** e **testes integrais** garantindo a qualidade do software com **Jest*** (Feature congelada no momento)
- Autenticação segura de usuários com **Tokens JWT**, **Refresh Tokens**, **Tokens Revogados/Invalidados**, e outros tokens, como **Recuperação de senha** e **Validação de E-mail**
- Suporte ao upload de imagens (tanto local quanto no **Amazon S3** da **AWS**) usando **Multer**
- Sistema de administração para usuários com permissões especiais
- Uso do **.env** para armazenação de variáveis de ambientes sensíveis
- Tratamento de erros personalizados atráves de **middlewares**
- Verificação de usuário autenticado atráves de **middlewares**
- Envio automatizados de e-mails com o serviço **SES** da **AWS Amazon** para usuários com recuperação de senhas, notificações de compras, status de fotos para impressão, etc.
- Atualização de notificações para os usuários em tempo real atráves de **WebSockets**
- Código organizado e estruturado seguindo os princípios **SOLID** e **Clean Architecture**
- Utilizando **node-cron** para **agendamento** na deleção do banco de dados os tokens expirados

<hr>

# Foto do Zinho
**Foto do Zinho é uma aplicação baseada nos serviços de uma empresa de fotografia e outros serviços relacionados. A aplicação oferece rotas para manipulação e uso desses serviços, registro de usuários, sistema de administração, rotas autenticadas e mais.**

## Tecnologias e Termos Usados
- Padrões REST e RESTful para a e CRUD das entidades
- Banco de dados SQL Postgres
- ORM PRisma para manipular o banco de dados
- Node e TypeScript
- Segurança por meio de criptografia
- Code style com ESLint
- Autenticação por meio de tokens JWT
- Uso de tokens como refresh tokens, tokens invalidados, tokens para recuperação de senha e tokens para validação de e-mail
- Sistema para upload de imagens (no S3 da AWS da Amazon) com Multer
- Sistema de administração para usuários com permissões especiais
- Uso do .env
- Tratamento de erro com middleware
- Verificação de usuário autenticado, autorizado e etc. com middleware
- Envio de e-mails com o SES da AWS da Amazon, usando Nodemailer
- Código organizado com SOLID e Clean Architecture
- Node-cron para tarefas agendadas
- MS para manipulação de tempo e hora
- CORS, Lodash, Express-Async-Errors e outros.


## Como Usar
Para começar a usar o Foto do Zinho, você precisará fazer o clone do repositório e instalar as dependências com o comando `npm install` ou `yarn`. Você também precisará criar um arquivo `.env` na raiz do projeto com as variáveis de ambiente necessárias. Você pode utilizar o arquivo `.env.example` para se basear nas variáveis.


## Rotas Disponíveis
Aqui estão as **principais** rotas disponíveis no Foto do Zinho:

### Autenticação
```
POST /auth/signin: usada para que o usuário faça login na aplicação. Ela é protegida pelo middleware preventAuthenticatedAccess, que impede o acesso à rota caso o usuário já esteja autenticado.
POST /auth/signup: usada para que um novo usuário se cadastre na aplicação. Ela também é protegida pelo middleware preventAuthenticatedAccess.
DELETE /auth/signout: usada para que o usuário faça logout da aplicação. Ela é protegida pelo middleware ensureAuth, que impede o acesso à rota caso o usuário não esteja autenticado.
GET /auth/validate: usada para validar se o token de acesso enviado na requisição é válido. Ela também é protegida pelo middleware ensureAuth.
POST /auth/refresh-token: usada para gerar um novo token de acesso a partir do refresh token. Ela não é protegida por nenhum middleware, mas requer um refresh token válido na requisição.
```

### Manipulação de usuários
```
GET /users: Lista todos os usuários cadastrados no sistema (para administradores apenas)
GET /users/inactive: Lista todos os usuários inativos (para administradores apenas)
GET /users/id/:id: Retorna informações sobre um usuário específico (apenas para o próprio usuário ou administradores)
GET /users/email/:email: Retorna informações sobre um usuário específico, identificado pelo seu endereço de email
POST /users: Cria um novo usuário no sistema (para administradores apenas)
PUT /users/:id: Atualiza informações do usuário com o ID especificado (apenas para o próprio usuário ou administradores)
PATCH /users/:id/password: Atualiza a senha do usuário com o ID especificado (apenas para o próprio usuário ou administradores)
DELETE /users/:id: Remove o usuário com o ID especificado (para administradores apenas)
DELETE /users/account/:id: Remove a conta do próprio usuário com o ID especificado (apenas para o próprio usuário ou administradores)
```

### Validações e recuperação de senha
```
/validate-email/:token: Valida o e-mail do usuário;
/set-password: Define uma nova senha para o usuário que utilizou da recuperação de senha (apenas se o token for válido);
/recovery-password: Envia um token para recuperação de senha no e-mail do usuário;
/validate-recovery-password-token/:token: Apenas verifica se o token para recuperação de senha é válido.
```


## Segurança
O Foto do Zinho utiliza tokens JWT para autenticação de usuários, e possui sistema de autenticação e autorização de rotas. A aplicação também utiliza criptografia para manter as senhas dos usuários seguras. O projeto também utiliza tokens para recuperação de senha e validação de e-mail, além de tokens refresh para evitar que os usuários tenham que fazer login frequentemente.

## Tratamento de Erros
O Foto do Zinho utiliza middleware para o tratamento de erros, fornecendo respostas claras e adequadas para os usuários em caso de erros na API.

## Envio de E-mails
O Foto do Zinho utiliza o SES da AWS da Amazon para enviar e-mails, com o uso do pacote Nodemailer.
Você precisa configurar os dados para autenticação do seu SES caso queira utilizar do serviço de envio de e-mails.

## Código Organizado
O código do Foto do Zinho segue os padrões SOLID e Clean Architecture, tornando-o mais organizado e fácil de manter.
