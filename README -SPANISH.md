Sistema CRM - Prueba de Concepto (POC)

Visión General
Este proyecto es una Prueba de Concepto (POC) de un Sistema de Gestión de Relaciones con Clientes (CRM) diseñado para demostrar una aplicación web escalable y moderna para gestionar interacciones con clientes. Cuenta con un backend en Node.js construido con arquitectura hexagonal, un frontend en Angular con una interfaz pulida y la integración con el Modelo de Lenguaje de Gran Escala (LLM) de Hugging Face para el procesamiento avanzado de texto (por ejemplo, resúmenes de interacciones con clientes). Todo el sistema está containerizado con Docker y orquestado con Docker Compose para facilitar la configuración e implementación.
La aplicación permite:

Crear y listar clientes.
Registrar y gestionar interacciones con clientes.
Utilizar el LLM para generar resúmenes y respuestas automáticas.
Acceder a una interfaz responsiva y amigable con estilización Tailwind CSS.


Tecnologías Utilizadas



Tecnología
Versión
Finalidad



Node.js
20
Entorno de ejecución del backend


TypeScript
5.8
Tipado estático para backend y frontend


Express.js
5.1
Framework web del backend


Mongoose
8.16
ORM para MongoDB


Angular
18
Framework SPA para el frontend


Tailwind CSS
3.x
Estilización moderna de la interfaz


Hugging Face LLM
API
Resumen de textos y respuestas automáticas


MongoDB
7.0
Base de datos NoSQL


Docker & Docker Compose
Última
Containerización y orquestación



Estructura del Proyecto
crm-project/
├── backend/                     # Código del backend Node.js
│   ├── src/
│   │   ├── adapters/           # Controladores, repositorios, servicios
│   │   ├── domain/             # Lógica de negocio (entidades, casos de uso)
│   │   ├── infrastructure/      # Configuración, base de datos, entorno
│   │   └── app.ts              # Punto de entrada
│   ├── Dockerfile              # Configuración del contenedor del backend
│   ├── package.json
│   └── tsconfig.json
├── frontend/crm-frontend/       # Código del frontend Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/     # Formulario de cliente, navegación, etc.
│   │   │   ├── services/       # Servicios de API
│   │   │   └── app.component.* # Componente principal (navbar)
│   │   ├── styles.css          # Configuración de Tailwind CSS
│   │   └── index.html
│   ├── Dockerfile              # Configuración del contenedor del frontend
│   ├── angular.json
│   └── tailwind.config.js
├── docker-compose.yml           # Orquesta MongoDB, backend y frontend
├── .env                        # Variables de entorno (ej.: HUGGINGFACE_API_KEY)
└── README.md                   # Este archivo


Arquitectura
El proyecto sigue la arquitectura hexagonal (patrón de puertos y adaptadores) para garantizar modularidad, testabilidad y mantenibilidad. A continuación, se detalla la arquitectura, incluyendo las capas de frontend, backend e integración.
Diagrama de Arquitectura
graph TD
    A[Usuario] -->|HTTP| B[Frontend: Angular]
    B -->|HTTP /api| C[Backend: Node.js]
    C -->|MongoDB URI| D[MongoDB]
    C -->|Llamadas API| E[Hugging Face LLM]
    B -->|Red Docker| C
    C -->|Red Docker| D

Componentes
1. Frontend (Angular)

Finalidad: Proporciona una aplicación de página única (SPA) responsiva para la interacción con el usuario.
Características Principales:
Navegación: Barra de navegación (app.component.html) estilizada con Tailwind CSS, con fondo degradado, animaciones de hover y menú móvil.
Formulario de Cliente: Formulario (customer-form.component.html) para crear clientes, con validación en tiempo real, spinner de carga y estilización Tailwind.
Enrutamiento: Utiliza el Router de Angular para la navegación del lado del cliente (/customers, /add-customer, /all-interactions).
Integración con API: Se comunica con el backend a través de un proxy (proxy.conf.json) hacia http://backend:3000.


Tecnologías: Angular 18, Tailwind CSS, TypeScript, RxJS para solicitudes HTTP.
Estilización: Tailwind CSS ofrece una interfaz moderna y responsiva con colores personalizados (primary, secondary, accent) definidos en tailwind.config.js.

2. Backend (Node.js con Arquitectura Hexagonal)

Finalidad: Gestiona la lógica de negocio, la persistencia de datos y la integración con el LLM.
Estructura:
Capa de Dominio:
Entidades: Customer e Interaction definen los modelos de datos principales.
Casos de Uso: Lógica de negocio (ej.: CreateCustomerUseCase, CreateInteractionUseCase) encapsulada como servicios.
Puertos: Interfaces (ej.: InteractionRepository, LLMServicePort) definen contratos para repositorios y servicios externos.


Capa de Adaptadores:
Controladores: CustomerController e InteractionController manejan solicitudes HTTP y mapean a casos de uso.
Repositorios: CustomerMongoRepository e InteractionMongoRepository implementan el acceso a datos usando Mongoose.
Servicios: HuggingFaceService integra con la API de Hugging Face para resúmenes de texto y generación de respuestas.


Capa de Infraestructura:
Base de Datos: Conecta a MongoDB mediante mongoose (mongodb://mongo:27017/crm).
Entorno: Configurado a través de .env (ej.: HUGGINGFACE_API_KEY, MONGO_URI).




Tecnologías: Node.js 20, Express.js 5.1, Mongoose 8.16, TypeScript 5.8, Axios para solicitudes HTTP.
Endpoints:
POST /customers: Crea un cliente.
GET /customers: Lista todos los clientes.
POST /interactions: Crea una interacción con resumen y respuesta generados por el LLM.
GET /interactions/:customerId: Lista las interacciones de un cliente.
GET /interactions: Lista todas las interacciones.
GET /interactions/id/:id: Obtiene una interacción específica.
PUT /interactions/:id: Actualiza una interacción.
DELETE /interactions/:id: Elimina una interacción.



3. Base de Datos (MongoDB)

Finalidad: Almacena datos de clientes e interacciones.
Configuración: Ejecutado en un contenedor Docker (mongo:7) con un volumen persistente (mongo-data).
Esquema:
Clientes: { _id: String, name: String, email: String, phone: String }
Interacciones: { customerId: String, content: String, timestamp: Date, summary: String, autoResponse: String }


Healthcheck: Asegura que MongoDB esté listo (db.adminCommand('ping')).

4. Hugging Face LLM

Finalidad: Mejora las interacciones con resúmenes de texto y respuestas automáticas.
Integración: HuggingFaceService envía solicitudes a https://router.huggingface.co/together/v1/chat/completions usando el modelo mistralai/Mixtral-8x7B-Instruct-v0.1.
Configuración: Usa HUGGINGFACE_API_KEY del archivo .env.

5. Docker & Red

Docker Compose: Orquesta tres servicios (mongo, backend, frontend) en una red bridge (crm-network).
Red: Asegura que el frontend acceda al backend (http://backend:3000) y el backend acceda a MongoDB (mongodb://mongo:27017/crm).
Volúmenes: Persiste los datos de MongoDB (mongo-data) y monta el código fuente para desarrollo.


Requisitos Previos

Docker: Instale desde https://docs.docker.com/get-docker/.
Docker Compose: Incluido en Docker Desktop o instale por separado.
Hardware: Mínimo 4GB de RAM, 2 CPUs recomendados.
Node.js & npm: Opcional para desarrollo local fuera de Docker (Node.js 20+).
Variables de Entorno:
Cree un archivo .env en la raíz del proyecto:HUGGINGFACE_API_KEY=su_clave_huggingface_aquí






Instrucciones de Configuración

Clonar el Repositorio:
git clone <URL_DEL_REPOSITORIO>
cd crm-project/crm-hexagonal


Crear Directorio de Datos de MongoDB:
sudo mkdir -p /home/weslleyprado/Desktop/companies/portfolio-weslley/crm-project/crm-project/crm-hexagonal/mongo-data
sudo chmod -R 777 /home/weslleyprado/Desktop/companies/portfolio-weslley/crm-project/crm-project/crm-hexagonal/mongo-data


Iniciar los Servicios:
docker-compose up -d --build


Acceder a la Aplicación:

Frontend: http://localhost:4200
API del Backend: http://localhost:3000
MongoDB: mongodb://localhost:27017/crm (accesible vía mongosh)


Verificar la Configuración:
docker ps -a
docker-compose logs frontend
docker-compose logs backend
docker-compose logs mongo




Uso

Navegar en la Interfaz:

Clientes: Visualice y gestione clientes en /customers.
Agregar Cliente: Cree un nuevo cliente en /add-customer.
Todas las Interacciones: Vea todas las interacciones en /all-interactions.


Probar la API:

Crear un cliente:curl -X POST http://localhost:3000/customers \
-H "Content-Type: application/json" \
-d '{"name":"Cliente de Prueba","email":"prueba@ejemplo.com","phone":"1234567890"}'


Crear una interacción:curl -X POST http://localhost:3000/interactions \
-H "Content-Type: application/json" \
-d '{"customerId":"686ebcd376c8bdb67f7c335c","content":"bom dia","timestamp":"2025-07-09T19:29:25.852Z"}'


Probar la API de Hugging Face:curl -X POST https://router.huggingface.co/together/v1/chat/completions \
-H "Authorization: Bearer $HUGGINGFACE_API_KEY" \
-H "Content-Type: application/json" \
-d '{"model":"mistralai/Mixtral-8x7B-Instruct-v0.1","messages":[{"role":"user","content":"Resumir: bom dia"}]}'




Acceder a MongoDB:
docker exec -it crm-hexagonal-mongo-1 mongosh
use crm
db.customers.find()
db.interactions.find()




Depuración de Problemas Comunes

getaddrinfo EAI_AGAIN backend
- **Causa**: El frontend no puede resolver el hostname `backend`.
- **Solución**:
  - Verifique que `proxy.conf.json` apunte a `http://backend:3000`.
  - Confirme que todos los servicios estén en la red `crm-network` en `docker-compose.yml`.
  - Revise los logs del backend:
    ```bash
    docker-compose logs backend
    ```



POST /api/* 500 (Error Interno del Servidor)
- **Causa**: Probablemente un problema en `HuggingFaceService` o `CreateInteractionUseCase`.
- **Solución**:
  - Revise los logs del backend para errores:
    ```bash
    docker-compose logs backend
    ```
  - Confirme la `HUGGINGFACE_API_KEY` en `.env`.
  - Pruebe la API directamente:
    ```bash
    curl -X POST http://localhost:3000/interactions ...
    ```
  - Inspeccione MongoDB:
    ```bash
    docker exec -it crm-hexagonal-mongo-1 mongosh
    use crm
    db.interactions.find()
    ```



Problemas de Conexión con MongoDB
- **Causa**: El backend no puede conectar a `mongodb://mongo:27017/crm`.
- **Solución**:
  - Verifique que MongoDB esté saludable:
    ```bash
    docker ps -a
    ```
  - Revise los logs del backend para errores de conexión.
  - Confirme la `MONGO_URI` en `.env` o `environment.ts`.



Notas de Desarrollo

Frontend: Ejecute localmente sin Docker:cd frontend/crm-frontend
npm install
ng serve --host 0.0.0.0 --disable-host-check --proxy-config proxy.conf.json


Backend: Ejecute localmente sin Docker:cd backend
npm install
npm run build
node dist/app.js


Advertencias de MongoDB: Ignore las advertencias sobre vm.max_map_count, XFS y control de acceso para desarrollo local.


Mejoras Futuras

Agregar autenticación (ej.: JWT) para acceso seguro a la API.
Implementar funciones avanzadas de LLM (ej.: análisis de sentimientos).
Mejorar la interfaz con alternancia de tema claro/oscuro y componentes adicionales.
Agregar pruebas unitarias e de integración para backend y frontend.


Contacto
Para preguntas, sugerencias o contribuciones, contacte a:
Weslley Prado - Arquitecto de soluciones e ingeniero de software
Correo: weslleyrprado@syttechnology.com