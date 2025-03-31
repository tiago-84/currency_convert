//Cotação da moedas do dia
const USD = 5.74;
const EUR = 6.23;
const GBP = 7.46;

//Obtendo os elementos do formulario
const form = document.querySelector('form');
const amount = document.getElementById('amount');
const currency = document.getElementById('currency');
const footer = document.querySelector('main footer');
const description = document.getElementById('description');
const result = document.getElementById('result');

//Manipulando o input amount para receber somente numeros.
amount.addEventListener('input', () => {
  const hasCharacterRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharacterRegex, '');
});

//capturando o evento de submit do formulario
form.onsubmit = (event) => {
  event.preventDefault();

  switch (currency.value) {
    case 'USD':
      convertCurrency(amount.value, USD, 'US$');
      break;
    case 'EUR':
      convertCurrency(amount.value, EUR, '€');
      break;
    case 'GBP':
      convertCurrency(amount.value, GBP, '£');
      break;
  }
};

//Funçao para converter a moeda
function convertCurrency(amount, price, symbol) {
  try {
    //Exibindo a cotação da moeda selecionada
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

    //calcula o total
    let total = amount * price;

    //Verifica se a entrada é numero
    if (isNaN(total)) {
      return alert('Por favor, digite o valor corretamente para converter');
    }

    total = formatCurrencyBRL(total).replace('R$', '');

    //Exibe o resultado total
    result.textContent = `${total} Reais`;

    //aplica a classe que exibe o footer do formulário
    footer.classList.add('show-result');
  } catch (error) {
    // remove a classe que exibe o footer removendo ele da tela
    footer.classList.remove('show-result');

    console.log(error);
    alert('Não foi possivel fazer a conversão! Tente novamente mais tarde.');
  }
}

//Formata a moeda em real brasileiro
function formatCurrencyBRL(value) {
  //Converte para numero para utilizar o toLocalString para formatar no padrão BRL.(R$ 00,00)
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
