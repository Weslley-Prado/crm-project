Sistema CRM - Prova de Conceito (POC)

Visão Geral
Este projeto é uma Prova de Conceito (POC) de um Sistema de Gerenciamento de Relacionamento com Clientes (CRM) desenvolvido para demonstrar uma aplicação web escalável e moderna para gerenciar interações com clientes. Ele possui um backend Node.js construído com arquitetura hexagonal, um frontend Angular com uma interface polida e integração com o Modelo de Linguagem de Grande Escala (LLM) da Hugging Face para processamento avançado de texto (ex.: resumo de interações com clientes). Todo o sistema é containerizado com Docker e orquestrado com Docker Compose para facilitar a configuração e implantação.
A aplicação permite:

Criar e listar clientes.
Registrar e gerenciar interações com clientes.
Utilizar LLM para gerar resumos e respostas automáticas.
Acessar uma interface responsiva e amigável com estilização Tailwind CSS.


Tecnologias Utilizadas



Tecnologia
Versão
Finalidade



Node.js
20
Runtime do backend


TypeScript
5.8
Tipagem estática para backend e frontend


Express.js
5.1
Framework web do backend


Mongoose
8.16
ORM para MongoDB


Angular
18
Framework SPA para frontend


Tailwind CSS
3.x
Estilização moderna da interface


Hugging Face LLM
API
Resumo de textos e respostas automáticas


MongoDB
7.0
Banco de dados NoSQL


Docker & Docker Compose
Última
Containerização e orquestração



Estrutura do Projeto
crm-project/
├── backend/                     # Código do backend Node.js
│   ├── src/
│   │   ├── adapters/           # Controladores, repositórios, serviços
│   │   ├── domain/             # Lógica de negócio (entidades, casos de uso)
│   │   ├── infrastructure/      # Configuração, banco de dados, ambiente
│   │   └── app.ts              # Ponto de entrada
│   ├── Dockerfile              # Configuração do container do backend
│   ├── package.json
│   └── tsconfig.json
├── frontend/crm-frontend/       # Código do frontend Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/     # Formulário de cliente, navegação, etc.
│   │   │   ├── services/       # Serviços de API
│   │   │   └── app.component.* # Componente principal (navbar)
│   │   ├── styles.css          # Configuração Tailwind CSS
│   │   └── index.html
│   ├── Dockerfile              # Configuração do container do frontend
│   ├── angular.json
│   └── tailwind.config.js
├── docker-compose.yml           # Orquestra MongoDB, backend e frontend
├── .env                        # Variáveis de ambiente (ex.: HUGGINGFACE_API_KEY)
└── README.md                   # Este arquivo


Arquitetura
O projeto segue a arquitetura hexagonal (padrão de portas e adaptadores) para garantir modularidade, testabilidade e manutenibilidade. Abaixo está uma descrição detalhada da arquitetura, incluindo frontend, backend e camadas de integração.
Diagrama de Arquitetura
graph TD
    A[Usuário] -->|HTTP| B[Frontend: Angular]
    B -->|HTTP /api| C[Backend: Node.js]
    C -->|MongoDB URI| D[MongoDB]
    C -->|Chamadas API| E[Hugging Face LLM]
    B -->|Rede Docker| C
    C -->|Rede Docker| D

Componentes
1. Frontend (Angular)

Finalidade: Fornece uma aplicação de página única (SPA) responsiva para interação com o usuário.
Principais Recursos:
Navegação: Barra de navegação (app.component.html) estilizada com Tailwind CSS, com fundo gradiente, animações de hover e menu móvel.
Formulário de Cliente: Formulário (customer-form.component.html) para criar clientes, com validação em tempo real, spinner de carregamento e estilização Tailwind.
Roteamento: Utiliza o Router do Angular para navegação no lado do cliente (/customers, /add-customer, /all-interactions).
Integração com API: Comunica-se com o backend via proxy (proxy.conf.json) para http://backend:3000.


Tecnologias: Angular 18, Tailwind CSS, TypeScript, RxJS para requisições HTTP.
Estilização: Tailwind CSS oferece uma interface moderna e responsiva com cores personalizadas (primary, secondary, accent) definidas em tailwind.config.js.

2. Backend (Node.js com Arquitetura Hexagonal)

Finalidade: Gerencia lógica de negócio, persistência de dados e integração com LLM.
Estrutura:
Camada de Domínio:
Entidades: Customer e Interaction definem os modelos de dados principais.
Casos de Uso: Lógica de negócio (ex.: CreateCustomerUseCase, CreateInteractionUseCase) encapsulada como serviços.
Portas: Interfaces (ex.: InteractionRepository, LLMServicePort) definem contratos para repositórios e serviços externos.


Camada de Adaptadores:
Controladores: CustomerController e InteractionController lidam com requisições HTTP e mapeiam para casos de uso.
Repositórios: CustomerMongoRepository e InteractionMongoRepository implementam acesso a dados usando Mongoose.
Serviços: HuggingFaceService integra com a API da Hugging Face para resumo de textos e geração de respostas.


Camada de Infraestrutura:
Banco de Dados: Conecta ao MongoDB via mongoose (mongodb://mongo:27017/crm).
Ambiente: Configurado via .env (ex.: HUGGINGFACE_API_KEY, MONGO_URI).




Tecnologias: Node.js 20, Express.js 5.1, Mongoose 8.16, TypeScript 5.8, Axios para requisições HTTP.
Endpoints:
POST /customers: Cria um cliente.
GET /customers: Lista todos os clientes.
POST /interactions: Cria uma interação com resumo e resposta gerados por LLM.
GET /interactions/:customerId: Lista interações de um cliente.
GET /interactions: Lista todas as interações.
GET /interactions/id/:id: Obtém uma interação específica.
PUT /interactions/:id: Atualiza uma interação.
DELETE /interactions/:id: Exclui uma interação.



3. Banco de Dados (MongoDB)

Finalidade: Armazena dados de clientes e interações.
Configuração: Executado em um container Docker (mongo:7) com volume persistente (mongo-data).
Esquema:
Clientes: { _id: String, name: String, email: String, phone: String }
Interações: { customerId: String, content: String, timestamp: Date, summary: String, autoResponse: String }


Healthcheck: Garante que o MongoDB está pronto (db.adminCommand('ping')).

4. Hugging Face LLM

Finalidade: Aprimora interações com resumo de textos e respostas automáticas.
Integração: HuggingFaceService envia requisições para https://router.huggingface.co/together/v1/chat/completions usando o modelo mistralai/Mixtral-8x7B-Instruct-v0.1.
Configuração: Usa HUGGINGFACE_API_KEY do arquivo .env.

5. Docker & Rede

Docker Compose: Orquestra três serviços (mongo, backend, frontend) em uma rede bridge (crm-network).
Rede: Garante que o frontend acesse o backend (http://backend:3000) e o backend acesse o MongoDB (mongodb://mongo:27017/crm).
Volumes: Persiste dados do MongoDB (mongo-data) e monta código-fonte para desenvolvimento.


Pré-requisitos

Docker: Instale em https://docs.docker.com/get-docker/.
Docker Compose: Incluído no Docker Desktop ou instale separadamente.
Hardware: Mínimo de 4GB de RAM, 2 CPUs recomendados.
Node.js & npm: Opcional para desenvolvimento local fora do Docker (Node.js 20+).
Variáveis de Ambiente:
Crie um arquivo .env na raiz do projeto:HUGGINGFACE_API_KEY=sua_chave_huggingface_aqui






Instruções de Configuração

Clonar o Repositório:
git clone <URL_DO_REPOSITÓRIO>
cd crm-project/crm-hexagonal


Criar Diretório de Dados do MongoDB:
sudo mkdir -p /home/weslleyprado/Desktop/companies/portfolio-weslley/crm-project/crm-project/crm-hexagonal/mongo-data
sudo chmod -R 777 /home/weslleyprado/Desktop/companies/portfolio-weslley/crm-project/crm-project/crm-hexagonal/mongo-data


Iniciar os Serviços:
docker-compose up -d --build


Acessar a Aplicação:

Frontend: http://localhost:4200
API do Backend: http://localhost:3000
MongoDB: mongodb://localhost:27017/crm (acessível via mongosh)


Verificar a Configuração:
docker ps -a
docker-compose logs frontend
docker-compose logs backend
docker-compose logs mongo




Uso

Navegar na Interface:

Clientes: Visualize e gerencie clientes em /customers.
Adicionar Cliente: Crie um novo cliente em /add-customer.
Todas as Interações: Veja todas as interações em /all-interactions.


Testar a API:

Criar um cliente:curl -X POST http://localhost:3000/customers \
-H "Content-Type: application/json" \
-d '{"name":"Teste Cliente","email":"teste@exemplo.com","phone":"1234567890"}'


Criar uma interação:curl -X POST http://localhost:3000/interactions \
-H "Content-Type: application/json" \
-d '{"customerId":"686ebcd376c8bdb67f7c335c","content":"bom dia","timestamp":"2025-07-09T19:29:25.852Z"}'


Testar a API da Hugging Face:curl -X POST https://router.huggingface.co/together/v1/chat/completions \
-H "Authorization: Bearer $HUGGINGFACE_API_KEY" \
-H "Content-Type: application/json" \
-d '{"model":"mistralai/Mixtral-8x7B-Instruct-v0.1","messages":[{"role":"user","content":"Resumir: bom dia"}]}'




Acessar o MongoDB:
docker exec -it crm-hexagonal-mongo-1 mongosh
use crm
db.customers.find()
db.interactions.find()




Depuração de Problemas Comuns

getaddrinfo EAI_AGAIN backend
- **Causa**: O frontend não consegue resolver o hostname `backend`.
- **Solução**:
  - Verifique se `proxy.conf.json` aponta para `http://backend:3000`.
  - Confirme que todos os serviços estão na rede `crm-network` no `docker-compose.yml`.
  - Verifique os logs do backend:
    ```bash
    docker-compose logs backend
    ```



POST /api/* 500 (Erro Interno do Servidor)
- **Causa**: Provavelmente um problema no `HuggingFaceService` ou `CreateInteractionUseCase`.
- **Solução**:
  - Verifique os logs do backend para erros:
    ```bash
    docker-compose logs backend
    ```
  - Confirme a `HUGGINGFACE_API_KEY` no `.env`.
  - Teste a API diretamente:
    ```bash
    curl -X POST http://localhost:3000/interactions ...
    ```
  - Inspecione o MongoDB:
    ```bash
    docker exec -it crm-hexagonal-mongo-1 mongosh
    use crm
    db.interactions.find()
    ```



Problemas de Conexão com MongoDB
- **Causa**: O backend não consegue conectar ao `mongodb://mongo:27017/crm`.
- **Solução**:
  - Verifique se o MongoDB está saudável:
    ```bash
    docker ps -a
    ```
  - Confira os logs do backend para erros de conexão.
  - Confirme a `MONGO_URI` no `.env` ou `environment.ts`.



Notas de Desenvolvimento

Frontend: Execute localmente sem Docker:cd frontend/crm-frontend
npm install
ng serve --host 0.0.0.0 --disable-host-check --proxy-config proxy.conf.json


Backend: Execute localmente sem Docker:cd backend
npm install
npm run build
node dist/app.js


Avisos do MongoDB: Ignore avisos sobre vm.max_map_count, XFS e controle de acesso para desenvolvimento local.


Melhorias Futuras

Adicionar autenticação (ex.: JWT) para acesso seguro à API.
Implementar recursos avançados de LLM (ex.: análise de sentimentos).
Melhorar a interface com alternância de tema claro/escuro e componentes adicionais.
Adicionar testes unitários e de integração para backend e frontend.


Contato
Para dúvidas, sugestões ou contribuições, entre em contato:
Weslley Prado - Arquiteto de Soluções e Engenheiro de Software
Email: weslleyrprado@syttechnology.com