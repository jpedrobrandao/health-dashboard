# Health Metrics Dashboard

O **Health Metrics Dashboard** é uma aplicação web que permite visualizar e comparar dados de saúde relacionados a diferentes doenças (como Gripe, COVID-19, Sarampo e Malária) ao longo do tempo. O sistema consiste em um backend (API REST com Flask) e um frontend (React.js) conectados a um banco de dados PostgreSQL.

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Funcionalidades](#funcionalidades)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Configuração do Projeto](#configuração-do-projeto)
   - [Pré-requisitos](#pré-requisitos)
   - [Backend](#backend)
   - [Frontend](#frontend)
5. [Como Executar o Projeto](#como-executar-o-projeto)
6. [Estrutura do Projeto](#estrutura-do-projeto)
7. [Contribuição](#contribuição)
8. [Licença](#licença)

---

## 🌟 Visão Geral

O objetivo deste projeto é fornecer uma interface interativa para análise de métricas de saúde pública. Usuários podem filtrar por doenças específicas, intervalos de datas e comparar os números de casos entre duas doenças em um gráfico de barras agrupadas.

---

## 🛠️ Funcionalidades

- **Filtros Dinâmicos**: Selecione doenças, data inicial e data final para personalizar os dados exibidos.
- **Gráficos Comparativos**: Compare até duas doenças em um gráfico de barras agrupadas.
- **Dados Precisos**: Exibe o número de casos registrados para cada data selecionada.
- **Interface Amigável**: Design minimalista e responsivo para melhor experiência do usuário.

---

## 💻 Tecnologias Utilizadas

- **Backend**:
  - Flask (Framework Python)
  - SQLAlchemy (ORM para PostgreSQL)
  - PostgreSQL (Banco de Dados Relacional)
- **Frontend**:
  - React.js (Biblioteca JavaScript)
  - Axios (Para requisições HTTP)
  - D3.js (Para visualização de dados)
  - React-DatePicker (Para seleção de datas)
- **Outros**:
  - CSS puro (Estilização)
  - Docker (Opcional, para containerização)

---

## 🔧 Configuração do Projeto

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas no seu ambiente:

- Python 3.11+
- Node.js 18+
- PostgreSQL
- Git

### Backend

#### 1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/health-dashboard.git
   cd health-dashboard/backend

``` 

#### 2. Crie e ative um ambiente virtual (opcional):

````
python3 -m venv venv
source venv/bin/activate
````
#### 3. Instale as dependências:
```bash
pip install -r requirements.txt
````

#### 4. Configure o banco de dados PostgreSQL:
Crie um banco de dados chamado health_data.
Atualize as credenciais no arquivo app.py:
```python
DATABASE_URI = "postgresql://postgres:your_password@localhost:5432/health_data"
```
#### 5. Execute migrações (se necessário) e insira os dados iniciais:
```sql
-- Execute o script SQL fornecido no README ou no diretório do projeto.
```

#### 6. Inicie o servidor Flask:
```
python app.py
```
### Frontend
#### 1. Navegue para o diretório do frontend:
```bash
cd ../frontend
```
#### 2. Instale as dependências:
```bash
npm install
```
#### 3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

## ▶️ Como Executar o Projeto

#### 1. Certifique-se de que o backend está rodando (http://localhost:8000).

#### 2. Certifique-se de que o frontend está rodando (http://localhost:3000).

#### 3. Acesse o dashboard no navegador: http://localhost:3000

#### 4. Use os filtros para selecionar doenças e datas, e visualize os dados no gráfico.



## 📂 Estrutura do Projeto

health-dashboard/
├── backend/
│   ├── app.py          # Código do backend Flask
│   ├── requirements.txt # Dependências do backend
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── App.js      # Componente principal do React
│   │   ├── Dashboard.js # Componente do dashboard
│   │   └── ...         # Outros arquivos do React
│   ├── package.json    # Dependências do frontend
│   └── ...
└── README.md           # Este arquivo

## 📝 Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](https://choosealicense.com/licenses/mit/) para mais detalhes.