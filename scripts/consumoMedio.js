document.addEventListener('DOMContentLoaded', () => {
    const calcularMediaBtn = document.getElementById('calcularMedia');
    const kmInput = document.getElementById('input_km_rodado');
    const litrosInput = document.getElementById('input_litros');
    const resultado = document.getElementById('resultado');

    if (calcularMediaBtn && kmInput && litrosInput && resultado) {
        calcularMediaBtn.addEventListener('click', () => {
            const km = parseFloat(kmInput.value);
            const litros = parseFloat(litrosInput.value);
            if (isNaN(km) || isNaN(litros)) {
                resultado.textContent = "Por favor, insira valores numéricos válidos.";
                return;
            }
            try {
                const consumoMedio = calcularConsumoMedio(km, litros);
                resultado.textContent = `O consumo médio é de ${consumoMedio.toFixed(2)} km/l.`;
            } catch (error) {
                resultado.textContent = error.message;
            }
        });
    }

    function calcularConsumoMedio(km, litros) {
        if (litros === 0) {
            throw new Error("A quantidade de litros não pode ser zero.");
        }
        return km / litros;
    }
});
