# A fazer:
- Verificar quais propriedades podem estar faltando (olhar o figma algo como por exemplo: top comprados na semana, etc)
- Configurar algum provedor de e-mails
- Criar a rota para alteração de senha via usuário
- Criar a rota para recuperação de senhas
- Criar a rota para deleção de conta via usuário
- Criar a verificação de usuário administrador e aplicar nas rotas administrativas
- Criar a rota para suporte
- Salvar todos os tokens gerados
- Refazer os testes unitários corretamente
- Criar os testes integrais
- Desenvolver a parte web
- Adicionar WebSockets na api e na web
- Criar os testes E2E

# Conceitos:
- Testes E2E para garantir a integração de todos os componentes do sistema

## Backend:
- Manipulação/CRUD das entidades completo por meio dos padrões **REST** e **RESTful**
- **Banco de dados SQL Postgres** para relações mais complexas
- **ORM Prisma** para manipualação do banco de dados
- Desenvolvido com **Node** e **Typescript** para aumentar a robustez e clareza do código
- Segurança de senhas aprimoradas atráves da **criptografia**
- Code Style com **ESLint**
- **Testes unitários** e **testes integrais** garantindo a qualidade do software com **Jest**
- Autenticação segura de usuários com **Tokens JWT**, **Refresh Tokens** e **Tokens Revogados/Invalidados**
- Suporte ao upload de imagens (tanto local quanto no **Amazon S3** da **AWS**) usando **Multer**
- Sistema de administração para usuários com permissões especiais
- Uso do **.env** para armazenação de variáveis de ambientes sensíveis
- Tratamento de erros personalizados atráves de **middlewares**
- Verificação de usuário autenticado atráves de **middlewares**
- Envio automatizados de e-mails para usuários com recuperação de senhas, notificações de compras, status de fotos para impressão, etc.
- Atualização de notificações para os usuários em tempo real atráves de **WebSockets**
- Código organizado e estruturado seguindo os princípios **SOLID** e **Clean Architecture**
- Utilizando **node-cron** para **agendamento** na deleção do banco de dados os tokens revogados expirados
