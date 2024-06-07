// Adiciona um evento de submit ao formulário para calcular a velocidade quando o usuário submeter o formulário
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    
    // Obtém o valor do ponto X a partir do input do usuário
    const pontoX = parseFloat(document.getElementById('pontoX').value);
    
    // Verifica se o valor de pontoX é negativo
    if (pontoX < 0) {
        alert("O valor do ponto X não pode ser negativo.");
        return;
    }
    
    try {
        // Calcula a velocidade no ponto X e a velocidade média até o ponto X
        const velocidadeNoPontoX = calcularVelocidadeEmPontoX(pontoX);
        const velocidadeMedia = calcularVelocidadeMedia(pontoX);
        
        // Exibe os resultados na página
        document.getElementById('resultadoVelocidade').textContent = `Velocidade no ponto ${pontoX} km: ${velocidadeNoPontoX.toFixed(2)} km/h`;
        document.getElementById('resultadoVelocidadeMedia').textContent = `Velocidade média até o ponto ${pontoX} km: ${velocidadeMedia.toFixed(2)} km/h`;

        // Exibe o contêiner do gráfico
        document.getElementById('chart-container').style.display = 'block';
        
        // Cria o gráfico de velocidade
        criarGrafico(pontoX, velocidadeNoPontoX);
    } catch (error) {
        document.getElementById('resultadoVelocidade').textContent = `Erro: ${error.message}`;
    }
});

// Variável global para armazenar a instância do gráfico
let chart;

// Função para calcular a velocidade no ponto X usando a derivada da função de posição
function calcularVelocidadeEmPontoX(pontoX) {
    const math = window.math; // Usa a biblioteca math.js

    // Define a função de posição como t^2
    const funcaoPosicao = 't^2';

    // Analisa a função para criar uma expressão math.js
    const expr = math.parse(funcaoPosicao);
    
    // Cria uma função de t usando a expressão analisada
    const f = (t) => expr.evaluate({ t });

    // Deriva a função de posição em relação ao tempo t
    const derivedExpr = math.derivative(expr, 't');
    const df = (t) => derivedExpr.evaluate({ t });

    // Encontra o tempo correspondente ao ponto X
    // Resolva numericamente para t, dado x = pontoX
    const t = math.sqrt(pontoX); // Para x(t) = t^2, t = sqrt(x)

    // Calcula a velocidade no tempo correspondente usando a derivada
    const velocidade = df(t); // Para x(t) = t^2, a derivada é 2t

    return velocidade;
}

// Função para calcular a velocidade média até o ponto X
function calcularVelocidadeMedia(pontoX) {
    const t = Math.sqrt(pontoX); // Calcula o tempo correspondente a pontoX
    const velocidadeMedia = pontoX / t; // Velocidade média é a distância total dividida pelo tempo total
    return velocidadeMedia;
}

// Função para criar o gráfico de velocidade
function criarGrafico(pontoX, velocidadeNoPontoX) {
    const ctx = document.getElementById('velocidadeChart').getContext('2d');
    
    // Destroi o gráfico existente antes de criar um novo (para evitar sobreposições)
    if (chart) {
        chart.destroy();
    }
    
    // Cria um novo gráfico usando Chart.js
    chart = new Chart(ctx, {
        type: 'line', // Define o tipo de gráfico como linha
        data: {
            labels: Array.from({ length: pontoX + 1 }, (_, i) => i), // Gera os rótulos dos eixos
            datasets: [{
                label: 'Velocidade (km/h)',
                data: Array.from({ length: pontoX + 1 }, (_, i) => calcularVelocidadeEmPontoX(i)), // Gera os dados do gráfico
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Distância (km)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Velocidade (km/h)'
                    }
                }
            }
        }
    });
}
