document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.querySelector('button[type="submit"]');
    const precoGasolinaInput = document.getElementById('preco_gasolina');
    const consumoMedioInput = document.getElementById('consumo_medio');
    const distanciaInput = document.getElementById('distancia');
    const resultado = document.getElementById('resultado');

    if (submitBtn && precoGasolinaInput && consumoMedioInput && distanciaInput && resultado) {
        submitBtn.addEventListener('click', (event) => {
            event.preventDefault();
            const precoGasolina = parseFloat(precoGasolinaInput.value);
            const consumoMedio = parseFloat(consumoMedioInput.value);
            const distancia = parseFloat(distanciaInput.value);
            if (isNaN(precoGasolina) || isNaN(consumoMedio) || isNaN(distancia)) {
                resultado.textContent = "Por favor, insira valores numéricos válidos.";
                return;
            }
            try {
                const custoViagem = calcularCustoViagem(precoGasolina, consumoMedio, distancia);
                resultado.textContent = `O custo estimado da viagem é R$ ${custoViagem.toFixed(2)}.`;
            } catch (error) {
                resultado.textContent = error.message;
            }
        });
    }

    function calcularCustoViagem(precoGasolina, consumoMedio, distancia) {
        if (consumoMedio === 0) {
            throw new Error("O consumo médio não pode ser zero.");
        }
        return (distancia / consumoMedio) * precoGasolina;
    }
});
