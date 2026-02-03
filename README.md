# Automation Exercise - Test Automation Project 🤖🧪

Automação de testes end-to-end utilizando **Playwright** e **TypeScript** no site de prática:

[https://www.automationexercise.com/test_cases](https://www.automationexercise.com/test_cases)

Este projeto tem como objetivo automatizar os principais fluxos descritos no próprio site, aplicando boas práticas de automação de testes e documentando limitações reais da aplicação (instabilidade, anúncios e comportamentos inconsistentes).

---

## Sobre o projeto 📌

* Automação baseada nos casos de teste oficiais do site
* Arquitetura utilizando Page Object Model (POM)
* Dados sensíveis isolados em arquivo `.env`
* Bloqueio de anúncios e trackers
* Tratamento explícito de teste instável
* Projeto voltado para estudo e portfólio

---

## Tecnologias 🛠️

* Node.js
* Playwright
* TypeScript
* Page Object Model (POM)
* Dotenv

---

## Estrutura do projeto 📁

```
page-objects/
tests/
utils/
environment.ts
testData.ts
.env (ignorado)
playwright.config.ts
```

---

## Instalação ⚙️

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_PROJETO>
```

Instale as dependências:

```bash
npm install
```

Instale os navegadores do Playwright:

```bash
npx playwright install
```

Instale o dotenv:

```bash
npm install dotenv
```

---

## Configuração do Dotenv 🌱

O projeto utiliza o dotenv para carregar variáveis de ambiente a partir do arquivo .env.

Exemplo de uso no projeto:
```bash
import 'dotenv/config';

export const PASSWORD = process.env.PASSWORD;
```
Isso permite manter dados sensíveis fora do código-fonte e fora do repositório Git.

---

## Execução dos testes ▶️

Executar todos os testes:

```bash
npx playwright test --workers=1
```

Executar em modo interativo (UI):

```bash
npx playwright test --ui
```

Visualizar o relatório:

```bash
npx playwright show-report
```

---

## Variáveis de ambiente 🔐

Arquivo `.env` (não versionado):

```env
PASSWORD=your_password_here
```

O arquivo `.env` é ignorado pelo Git para evitar o versionamento de dados sensíveis.

---

## Bloqueio de anúncios e trackers 🚫📢

Para reduzir instabilidade causada por banners, iframes e scripts externos, foi adicionado o seguinte código em todos os `beforeEach`:

```ts
await page.route(/.*(ads|doubleclick|googlesyndication|adservice|tracking|analytics|fbq|pixel).*/, route => {
  route.abort();
});
```

Isso reduz a interferência visual e torna os testes mais previsíveis e estáveis.

---

## Teste instável ⚠️

O caso de teste **"Fale Conosco" (Caso 6)** apresenta comportamento inconsistente no site (alert intermitente e falha na renderização da mensagem de sucesso).

Por esse motivo, ele foi marcado explicitamente como instável:

```ts
test('Caso de teste 6: Fale conosco (instável)', async () => {
  test.fixme();
});
```

Essa abordagem documenta o problema real da aplicação sem comprometer a confiabilidade da suíte de testes.

---

## Objetivo 🎯

Este projeto foi desenvolvido com foco em:

* Prática de automação E2E
* Organização de código com POM
* Uso de variáveis de ambiente
* Tratamento de instabilidades reais
* Construção de portfólio técnico

---

## Observações finais 📝

Este projeto reflete um cenário real de testes automatizados em uma aplicação instável, mostrando não apenas testes funcionais, mas também estratégias para lidar com:

* Anúncios
* Scripts externos
* Comportamentos não determinísticos

Mais importante que "forçar" o teste a passar é **documentar o problema corretamente** — exatamente como em projetos reais. 💡
