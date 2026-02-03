import { expect, Page } from "@playwright/test";
import { BASE_URL } from "../utils/environment";
import { dadosFaleConosco } from "../utils/testData";

export default class FaleConoscoPage {
    constructor(private readonly page: Page) { }

    get menuFaleConosco() {
        return this.page.getByRole('link', { name: ' Contact us' });
    }

    get inputNome() {
        return this.page.getByRole('textbox', { name: 'Name' });
    }

    get inputEmail() {
        return this.page.getByRole('textbox', { name: 'Email', exact: true });
    }

    get inputAssunto() {
        return this.page.getByRole('textbox', { name: 'Subject' });
    }

    get inputMensagem() {
        return this.page.getByRole('textbox', { name: 'Your Message Here' });
    }

    get botaoEnviar() {
        return this.page.getByRole('button', { name: 'Submit' });
    }

    get mensagemSucesso() {
        return this.page.locator('.status.alert-success');
    }

    async NavegarParaFaleConosco() {
        await this.page.goto(BASE_URL);
        await this.menuFaleConosco.click();
    }

    async preencherFormularioFaleConosco() {
        await this.inputNome.fill(dadosFaleConosco.nome);
        await this.inputEmail.fill(dadosFaleConosco.email);
        await this.inputAssunto.fill(dadosFaleConosco.assunto);
        await this.inputMensagem.fill(dadosFaleConosco.mensagem);
    }

    async enviarFormularioEConfirmarAlert() {
        this.page.once('dialog', async (dialog) => {
            console.log('ALERT:', dialog.message());
            await dialog.accept();
        });

        await this.botaoEnviar.click();
    }

    async verificarMensagemSucesso() {
        const mensagem = this.page.locator('.status.alert-success');

        await expect(mensagem).toBeVisible({ timeout: 15000 });

        await expect(mensagem).toContainText(
            'Success! Your details have been submitted successfully.',
            { timeout: 15000 }
        );
    }
}
