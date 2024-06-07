document.getElementById('calcGasolinaBtn').addEventListener('click', () => {
    moveCar(() => window.location.href = document.getElementById('calcGasolinaBtn').dataset.url);
});
document.getElementById('calcConsumoMedioBtn').addEventListener('click', () => {
    moveCar(() => window.location.href = document.getElementById('calcConsumoMedioBtn').dataset.url);
});
document.getElementById('calcVelocidadeMediaBtn').addEventListener('click', () => {
    moveCar(() => window.location.href = document.getElementById('calcVelocidadeMediaBtn').dataset.url);
});

function moveCar(callback) {
    const car = document.getElementById('car');
    if (car.style.left === '0px' || car.style.left === '') {
        car.style.left = 'calc(100% - 100px)'; // Move o carro para a direita
    } else {
        car.style.left = '0px'; // Volta o carro para a posição inicial
    }
    setTimeout(callback, 500); // Espera o carro terminar de se mover antes de executar o callback
}
