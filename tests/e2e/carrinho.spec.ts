import test from "@playwright/test";
import CarrinhoPage from "../page-objects/Carrinho";

test.describe('Página do carrinho', () => {
  let carrinhoPage: CarrinhoPage;

  test.beforeEach(async ({ page }) => {
    await page.route(/.*(ads|doubleclick|googlesyndication|adservice|tracking|analytics|fbq|pixel).*/, route => {
      route.abort();
    });

    carrinhoPage = new CarrinhoPage(page);
    await carrinhoPage.navegarParaCarrinho();
  });

  test('Caso de teste 11: Deve navegar para a página de carrinho e validar assinatura', async () => {
    await carrinhoPage.verificarQueEstouNaPaginaDeCarrinho();
    await carrinhoPage.inserirEmailNaAssinatura('teste@tes.com');
    await carrinhoPage.verificarMensagemDeAssinaturaComSucesso();
  });
});
