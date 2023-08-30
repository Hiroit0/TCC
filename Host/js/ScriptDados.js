
const phoneInput = document.getElementById('phone-input');

phoneInput.addEventListener('input', (event) => {
  const inputValue = event.target.value.replace(/\D/g, ''); // Remove all non-digit characters
  let formattedValue = '';
  if (inputValue.length > 0) {
    formattedValue = '(' + inputValue.substring(0, 2) + ')';
    if (inputValue.length > 2) {
      formattedValue += ' ' + inputValue.substring(2, 7);
      if (inputValue.length > 7) {
        formattedValue += '-' + inputValue.substring(7, 11);
      }
    }
  }
  event.target.value = formattedValue;
});



const cnpjInput = document.getElementById('cnpj-input');

cnpjInput.addEventListener('input', (event) => {
  const inputValue = event.target.value.replace(/\D/g, ''); // Remove all non-digit characters
  let formattedValue = '';

  if (inputValue.length > 0) {
    formattedValue = inputValue.substring(0, 2) + '.';

    if (inputValue.length > 2) {
      formattedValue += inputValue.substring(2, 5) + '.';

      if (inputValue.length > 5) {
        formattedValue += inputValue.substring(5, 8) + '/';

        if (inputValue.length > 8) {
          formattedValue += inputValue.substring(8, 12) + '-';

          if (inputValue.length > 12) {
            formattedValue += inputValue.substring(12, 14);
          }
        }
      }
    }
  }

  event.target.value = formattedValue;
});