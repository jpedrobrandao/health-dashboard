from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from sqlalchemy import create_engine

app = Flask(__name__)
CORS(app)

# Configuração da conexão com o PostgreSQL
DATABASE_URI = "postgresql://postgres:PASSWORD@localhost:5432/health_data"
engine = create_engine(DATABASE_URI)

@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        # Obter parâmetros de filtro da URL
        diseases = request.args.getlist('disease')  # Agora aceita múltiplas doenças
        start_date = request.args.get('start_date', default=None, type=str)
        end_date = request.args.get('end_date', default=None, type=str)

        # Construir a consulta SQL base
        query = "SELECT * FROM health_metrics WHERE 1=1"
        
        if diseases:
            # Gerar a lista de doenças formatada para SQL
            diseases_list = ",".join([f"'{d}'" for d in diseases])
            query += f" AND disease IN ({diseases_list})"
        
        if start_date:
            query += f" AND date >= '{start_date}'"
        
        if end_date:
            query += f" AND date <= '{end_date}'"

        # Executar a consulta
        df = pd.read_sql(query, engine)

        # Converter DataFrame para JSON
        data = df.to_dict(orient='records')

        # Retornar os dados como resposta JSON
        return jsonify(data)

    except Exception as e:
        # Tratamento de erro: retorna uma mensagem de erro se algo der errado
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
