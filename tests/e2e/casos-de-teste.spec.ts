import test from "@playwright/test";
import CasosDeTestesPage from "../page-objects/CasosDeTestes";

test.describe('Página de casos de teste', () => {
    let casosDeTestes: CasosDeTestesPage;

    test.beforeEach(async ({ page }) => {
        await page.route(/.*(ads|doubleclick|googlesyndication|adservice|tracking|analytics|fbq|pixel).*/, route => {
            route.abort();
        });

        casosDeTestes = new CasosDeTestesPage(page);
        await casosDeTestes.NavegarParaCasosDeTeste();
    });

    test('Caso de teste 7: Navegar para página de Casos de Teste', async () => {
        await casosDeTestes.verificarNavegacaoCasosDeTeste();
    });
})