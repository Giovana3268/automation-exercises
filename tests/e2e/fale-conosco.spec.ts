import test, { expect } from "@playwright/test";
import FaleConoscoPage from "../page-objects/FaleConosco";

test.describe('Página de fale conosco', () => {
    let faleConoscoPage: FaleConoscoPage;

    test.beforeEach(async ({ page }) => {
        await page.route(/.*(ads|doubleclick|googlesyndication|tracking|analytics).*/, route => {
            route.abort();
        });

        faleConoscoPage = new FaleConoscoPage(page);
        await faleConoscoPage.NavegarParaFaleConosco();
    });

    test('Caso de teste 6: Fale conosco (instável)', async () => {
        test.fixme(true, 'Instável: alertas do navegador aparecem aleatoriamente'); 
        await faleConoscoPage.preencherFormularioFaleConosco();
        await faleConoscoPage.enviarFormularioEConfirmarAlert();
        await faleConoscoPage.verificarMensagemSucesso();
    });
});
