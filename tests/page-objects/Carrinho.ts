import { expect, Page } from "@playwright/test";
import { BASE_URL } from "../utils/environment";

export default class CarrinhoPage {
  constructor(private readonly page: Page) {}

  get menuCarrinho() {
    return this.page.getByRole('link', { name: /cart/i });
  }

  get campoEmailAssinatura() {
    return this.page.getByRole('textbox', { name: /your email address/i });
  }

  get botaoAssinar() {
    return this.page.locator('#subscribe');
  }

  get mensagemSucessoAssinatura() {
    return this.page.getByText(/you have been successfully/i);
  }

  public async navegarParaCarrinho() {
    await this.page.goto(BASE_URL);
    await this.menuCarrinho.click();
  }

  public async inserirEmailNaAssinatura(email: string) {
    await this.campoEmailAssinatura.fill(email);
    await this.botaoAssinar.click();
  }

  public async verificarMensagemDeAssinaturaComSucesso() {
    await expect(this.mensagemSucessoAssinatura).toBeVisible();
  }

  public async verificarQueEstouNaPaginaDeCarrinho() {
    await expect(this.page).toHaveURL(/\/view_cart$/);
  }
}
