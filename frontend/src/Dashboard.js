import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Dashboard.css'; // Importe os estilos

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({
        disease1: 'Flu', // Primeira doença
        disease2: 'COVID-19', // Segunda doença
        startDate: new Date('2019-01-01'),
        endDate: new Date('2023-12-31')
    });

    const fetchData = () => {
        let url = 'http://localhost:8000/api/data';
        const params = new URLSearchParams();

        // Adicionar ambas as doenças aos filtros
        params.append('disease', filters.disease1);
        params.append('disease', filters.disease2);

        if (filters.startDate) params.append('start_date', formatDate(filters.startDate));
        if (filters.endDate) params.append('end_date', formatDate(filters.endDate));

        axios.get(`${url}?${params.toString()}`)
            .then(response => setData(response.data))
            .catch(error => console.error(error));
    };

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            drawChart();
        }
    }, [data]);

    const drawChart = () => {
        d3.select("#chart").selectAll("*").remove();

        const svg = d3.select("#chart")
            .append("svg")
            .attr("width", 800)
            .attr("height", 500);

        const margin = { top: 50, right: 50, bottom: 50, left: 50 };
        const width = 800 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        // Filtrar dados para as duas doenças selecionadas
        const filteredData = data.filter(d => d.disease === filters.disease1 || d.disease === filters.disease2);

        // Agrupar dados por data e doença
        const groupedData = {};
        filteredData.forEach(d => {
            if (!groupedData[d.date]) {
                groupedData[d.date] = {};
            }
            groupedData[d.date][d.disease] = d.cases;
        });

        const dates = Object.keys(groupedData).sort();

        // Escala X (datas formatadas como "Janeiro, 2020")
        const xScale = d3.scaleBand()
            .domain(dates.map(date => formatDateForAxis(new Date(date))))
            .range([margin.left, width])
            .padding(0.2);

        // Escala Y (casos)
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(filteredData, d => d.cases)])
            .range([height, margin.top]);

        // Cores para as doenças
        const colors = {
            [filters.disease1]: "#007BFF",
            [filters.disease2]: "#FFC107"
        };

        // Barras agrupadas
        const barWidth = xScale.bandwidth() / 2;

        [filters.disease1, filters.disease2].forEach((disease, i) => {
            svg.selectAll(`rect.${disease}`)
                .data(dates)
                .enter()
                .append("rect")
                .attr("class", disease)
                .attr("x", date => xScale(formatDateForAxis(new Date(date))) + i * barWidth)
                .attr("y", date => yScale(groupedData[date][disease] || 0))
                .attr("width", barWidth)
                .attr("height", date => height - yScale(groupedData[date][disease] || 0))
                .attr("fill", colors[disease]);
        });

        // Valores nas barras
        [filters.disease1, filters.disease2].forEach((disease, i) => {
            svg.selectAll(`text.value.${disease}`)
                .data(dates)
                .enter()
                .append("text")
                .text(date => groupedData[date][disease] || 0)
                .attr("x", date => xScale(formatDateForAxis(new Date(date))) + i * barWidth + barWidth / 2)
                .attr("y", date => yScale(groupedData[date][disease] || 0) - 5)
                .attr("text-anchor", "middle")
                .style("fill", "#333")
                .style("font-size", "12px");
        });

        // Eixo X
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(xScale));

        // Eixo Y
        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(yScale));

        // Legenda
        const legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", `translate(${margin.left}, ${height + margin.bottom - 20})`);

        [filters.disease1, filters.disease2].forEach((disease, i) => {
            const legendItem = legend.append("g")
                .attr("transform", `translate(${i * 150}, 0)`); // Ajuste o espaçamento aqui

            legendItem.append("rect")
                .attr("class", "color-box")
                .attr("width", 20)
                .attr("height", 20)
                .attr("fill", colors[disease]);

            legendItem.append("text")
                .attr("x", 30)
                .attr("y", 15)
                .text(disease)
                .style("font-size", "14px");
        });

        // Explicação dos números
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom + 30)
            .text("Os números representam o número de casos registrados.")
            .style("font-size", "14px")
            .style("fill", "#666")
            .attr("text-anchor", "middle");
    };

    // Função para formatar datas no eixo X como "Janeiro, 2020"
    const formatDateForAxis = (date) => {
        const options = { month: 'long', year: 'numeric' };
        return new Intl.DateTimeFormat('pt-BR', options).format(date);
    };

    return (
        <div className="container">
            <h1>Health Metrics Dashboard</h1>

            <div className="filters">
                <label>
                    Doença 1:
                    <select
                        value={filters.disease1}
                        onChange={(e) => setFilters({ ...filters, disease1: e.target.value })}
                    >
                        <option value="Flu">Gripe (Flu)</option>
                        <option value="COVID-19">COVID-19</option>
                        <option value="Measles">Sarampo (Measles)</option>
                        <option value="Malaria">Malária (Malaria)</option>
                    </select>
                </label>

                <label>
                    Doença 2:
                    <select
                        value={filters.disease2}
                        onChange={(e) => setFilters({ ...filters, disease2: e.target.value })}
                    >
                        <option value="Flu">Gripe (Flu)</option>
                        <option value="COVID-19">COVID-19</option>
                        <option value="Measles">Sarampo (Measles)</option>
                        <option value="Malaria">Malária (Malaria)</option>
                    </select>
                </label>

                <label>
                    Data Inicial:
                    <DatePicker
                        selected={filters.startDate}
                        onChange={(date) => setFilters({ ...filters, startDate: date })}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={15}
                    />
                </label>

                <label>
                    Data Final:
                    <DatePicker
                        selected={filters.endDate}
                        onChange={(date) => setFilters({ ...filters, endDate: date })}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={15}
                    />
                </label>

                <button onClick={fetchData}>Filtrar</button>
            </div>

            <div id="chart" className="chart-container"></div>
        </div>
    );
};

export default Dashboard;