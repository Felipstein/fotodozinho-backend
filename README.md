## Backend:
- Manipulação/CRUD das entidades completo por meio dos padrões **REST** e **RESTful**
- **Banco de dados SQL Postgres** para relações mais complexas
- **ORM Prisma** para manipualação do banco de dados
- Desenvolvido com **Node** e **Typescript** para aumentar a robustez e clareza do código
- Segurança de senhas aprimoradas atráves da **criptografia**
- Code Style com **ESLint**
<!-- - **Testes unitários** e **testes integrais** garantindo a qualidade do software com **Jest** --> (Feature congelada no momento)
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
