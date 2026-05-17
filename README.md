# FAQ IA

Um projeto de FAQ inteligente utilizando integração com a API do Google Gemini.

O sistema consiste em:
- Um frontend moderno inspirado em interfaces de chat.
- Um backend em FastAPI.
- Respostas geradas por IA com base em um FAQ personalizado.

---

## Tecnologias Utilizadas

### Frontend
- React
- Vite
- TypeScript
- TailwindCSS
- Axios

### Backend
- Python
- FastAPI
- Uvicorn
- Google Gemini API
- Python Dotenv

---

## Configuração do Backend (Abra um terminal)

1. Criar ambiente virtual:
   python -m venv venv

2. Ativar ambiente virtual (Windows):
   venv\Scripts\activate

3. Instalar dependências:
   pip install -r requirements.txt

4. Na raiz da pasta backend, crie um arquivo chamado .env e adicione a sua chave:
   GEMINI_API_KEY=sua_key_aqui

5. Rodar o backend:
   uvicorn app.main:app --reload

6. Alimentar a base de dados:
   É necessário alimentar o arquivo faq.txt no diretório com as perguntas que deseja:
   faq-ia\backend\app\data

---

## Configuração do Frontend (Abra outro terminal)

1. Instalar dependências:
   npm install

2. Rodar o frontend:
   npm run dev

---

## Como Funciona

O usuário envia uma pergunta pelo frontend. O backend então realiza o seguinte fluxo:

1. Recebe a pergunta.
2. Consulta o conteúdo do FAQ local.
3. Envia o contexto estruturado para o Google Gemini.
4. Retorna a resposta gerada pela IA para o usuário.
