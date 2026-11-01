const { DateTime } = luxon;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('age-form');
  const birthdateInput = document.getElementById('birthdate');
  const resultContainer = document.getElementById('result-container');
  const resultText = document.getElementById('result-text');
  const errorMessage = document.getElementById('error-message');

  // Inicializar Flatpickr
  flatpickr(birthdateInput, {
    dateFormat: "d/m/Y",
    maxDate: "today",
    allowInput: true
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    resultContainer.classList.add('hidden');
    errorMessage.classList.add('hidden');

    const rawValue = birthdateInput.value.trim();

    if (!rawValue) {
      showError('Por favor, selecciona una fecha de nacimiento.');
      return;
    }

    const birthDate = DateTime.fromFormat(rawValue, 'dd/MM/yyyy');
    const now = DateTime.now();

    if (!birthDate.isValid) {
      showError('Ingresa una fecha válida en formato DD/MM/YYYY.');
      return;
    }

    if (birthDate > now) {
      showError('La fecha de nacimiento no puede ser en el futuro.');
      return;
    }

    const diff = now.diff(birthDate, ['years', 'months', 'days']).toObject();

    const years = Math.floor(diff.years || 0);
    const months = Math.floor(diff.months || 0);
    const days = Math.floor(diff.days || 0);

    let formattedResult = `${years} years ${months} months`;
    if (days > 0) {
      formattedResult += ` ${days} days`;
    }

    resultText.textContent = formattedResult;
    resultContainer.classList.remove('hidden');
  });

  function showError(msg) {
    errorMessage.textContent = msg;
    errorMessage.classList.remove('hidden');
  }
});