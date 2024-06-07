function calcularCustoViagem(precoGasolina: number, consumoMedio: number, distancia: number): number {
    if (consumoMedio === 0) {
        throw new Error("O consumo médio não pode ser zero.");
    }
    return (distancia / consumoMedio) * precoGasolina;
}

document.querySelector('button[type="submit"]')?.addEventListener('click', (event) => {
    event.preventDefault();

    const precoGasolinaInput = document.getElementById('preco_gasolina') as HTMLInputElement;
    const consumoMedioInput = document.querySelector('input[name="input"]:nth-of-type(2)') as HTMLInputElement;
    const distanciaInput = document.querySelector('input[name="input"]:nth-of-type(3)') as HTMLInputElement;
    const resultado = document.getElementById('resultado') as HTMLElement;

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
        resultado.textContent = (error as Error).message;
    }
});
