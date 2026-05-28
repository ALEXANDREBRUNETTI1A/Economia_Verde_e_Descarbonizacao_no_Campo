// Aguarda o carregamento total do DOM para prevenir erros de execução
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. VARIÁVEIS GERAIS E SELETORES DE CONTROLE
       ========================================== */
    let currentFontSize = 16; // Armazena o tamanho base da fonte (critério de variáveis)
    
    const btnTheme = document.getElementById('btn-theme');
    const btnFontUp = document.getElementById('btn-font-up');
    const btnFontDown = document.getElementById('btn-font-down');
    const btnCalculate = document.getElementById('btn-calculate');
    const userGreeting = document.getElementById('user-greeting');

    /* ==========================================
       2. RECURSO INTERATIVO: MODO ESCURO
       ========================================== */
    btnTheme.addEventListener('click', () => {
        // Altera a classe do body controlando as variáveis de cor CSS
        document.body.classList.toggle('dark-mode');
    });

    /* ==========================================
       3. RECURSO INTERATIVO: ALTERAÇÃO DE FONTE (ACESSIBILIDADE)
       ========================================== */
    btnFontUp.addEventListener('click', () => {
        if (currentFontSize < 22) { // Limite máximo para não quebrar o layout
            currentFontSize += 1;
            document.documentElement.style.setProperty('--base-font-size', currentFontSize + 'px');
        }
    });

    btnFontDown.addEventListener('click', () => {
        if (currentFontSize > 13) { // Limite mínimo de legibilidade
            currentFontSize -= 1;
            document.documentElement.style.setProperty('--base-font-size', currentFontSize + 'px');
        }
    });

    /* ==========================================
       4. LÓGICA E PROCESSAMENTO DA CALCULADORA E CAPTURA DE DADOS
       ========================================== */
    btnCalculate.addEventListener('click', () => {
        // Armazena inputs em variáveis locais antes de processá-los
        const clientName = document.getElementById('user-name').value.trim();
        const dieselLiters = parseFloat(document.getElementById('diesel-input').value);
        
        const resultBox = document.getElementById('calc-result');
        const resName = document.getElementById('res-name');
        const resCo2 = document.getElementById('res-co2');
        const resTrees = document.getElementById('res-trees');

        // Validação simples para evitar falhas ou resultados nulos no console
        if (!clientName || isNaN(dieselLiters) || dieselLiters <= 0) {
            alert('Por favor, preencha seu nome e a quantidade de litros corretamente.');
            return;
        }

        // Fator de emissão: 1 Litro de diesel emite cerca de 2.62 kg de CO2
        const calculatedCo2 = (dieselLiters * 2.62).toFixed(1);
        
        // Média de absorção anual de uma árvore da Mata Atlântica é de aprox. 15kg de CO2
        const treesRequired = Math.ceil(calculatedCo2 / 15);

        /* ==========================================
           5. MANIPULAÇÃO DINÂMICA DO DOM (HTML)
           ========================================== */
        // Atualiza textos específicos com os dados processados
        resName.textContent = clientName;
        resCo2.textContent = calculatedCo2;
        resTrees.textContent = treesRequired;

        // Modifica dinamicamente a saudação na barra superior do site
        userGreeting.textContent = `Olá, ${clientName}! Obrigado por simular sua pegada de carbono.`;
        userGreeting.style.color = '#74c69d';

        // Mostra a div de resultados alterando a propriedade display do CSS via JS
        resultBox.style.display = 'block';
        
        // Rola a tela de forma suave até o resultado gerado
        resultBox.scrollIntoView({ behavior: 'smooth' });
    });
});
