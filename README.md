# A fazer:
- Configurar o multer (para upload de imagens no S3 da aws)
- Adicionar o multer na rota da criação de pedido para impressão
- Adicionar o multer na rota da criação de produtos
- Criar as rotas para autenticação do usuário
- Criar o sistema de ensure-auth
- Criar entidade/CRUD de Refresh Tokens
- Configurar algum provedor de e-mails
- Criar a rota para alteração de senha via usuário
- Criar a rota para recuperação de senhas
- Criar a rota para deleção de conta via usuário
- Criar a verificação de usuário administrador e aplicar nas rotas administrativas
- Criar a rota para suporte
- Criar no figma a criação de categorias de produtos
- Adicionar no figma a opção de categorias na edição ou adição de produto
- Desenvolver a parte web
- Adicionar WebSockets na api e na web
- Criar os testes E2E

# Conceitos:
- Testes E2E para garantir a integração de todos os componentes do sistema
## Backend:
- Manipulação/CRUD das entidades completo por meio dos padrões REST e RESTful
- Banco de dados SQL Postgres para relações mais complexas
- ORM Prisma para manipualação do banco de dados
- Desenvolvido com Node e Typescript para aumentar a robustez e clareza do código
- Segurança de senhas aprimoradas atráves da criptografia
- Code Style com ESLint
- Testes unitários e integrais garantindo a qualidade do software com Jest
- Autenticação segura de usuários com Tokens JWT e Refresh Tokens
- Suporte ao upload de imagens (tanto local quanto no Amazon S3 da AWS) usando Multer
- Sistema de administração para usuários com permissões especiais
- Uso do .env para armazenação de variáveis de ambientes sensíveis
- Tratamento de erros personalizados atráves de middlewares
- Verificação de usuário autenticado atráves de middlewares
- Envio automatizados de e-mails para usuários com recuperação de senhas, notificações de compras, status de fotos para impressão, etc.
- Atualização de notificações para os usuários em tempo real atráves de WebSockets
- Código organizado e estruturado seguindo os princípios SOLID e Clean Architecture
