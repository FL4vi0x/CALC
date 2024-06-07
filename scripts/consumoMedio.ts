function calcularConsumoMedio(km: number, litros: number): number {
    if (litros === 0) {
        throw new Error("A quantidade de litros não pode ser zero.");
    }
    return km / litros;
}

document.getElementById('calcularMedia')?.addEventListener('click', () => {
    const kmInput = document.getElementById('input_km_rodado') as HTMLInputElement;
    const litrosInput = document.getElementById('input') as HTMLInputElement;
    const resultado = document.getElementById('resultado') as HTMLElement;

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
        resultado.textContent = (error as Error).message;
    }
});
