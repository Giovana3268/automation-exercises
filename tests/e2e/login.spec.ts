import test from "@playwright/test";
import LoginPage from "../page-objects/Login";
import { criarContaELogar, logarComUsuarioValido } from "../utils/authHelper";

test.describe('Página de login/cadastro', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        await page.route(/.*(ads|doubleclick|googlesyndication|tracking|analytics).*/, route => {
            route.abort();
        });

        loginPage = new LoginPage(page);
        await loginPage.NavegarParaLogin();
    });

    test('Caso de teste 1: Cadastrar um usuário', async ({ page }) => {
        await criarContaELogar(page);
        await loginPage.excluirUsuarioLogado();
        await loginPage.verificarSeUsuarioFoiExcluido();
    });

    test('Caso de teste 2: Login com usuário existente', async ({ page }) => {
        await logarComUsuarioValido(page);
    });

    test('Caso de teste 3: Login com dados inválidos', async () => {
        await loginPage.realizarLogin('Teste@teste.com', '2595959');
        await loginPage.verificarMensagemErroLogin();
    });

    test('Caso de teste 4: Fazer logout', async ({ page }) => {
        await logarComUsuarioValido(page);
        await loginPage.fazerLogout();
        await loginPage.verificarLogout();
    });

    test('Caso de teste 5: Criar um novo usuário com email já existente', async () => {
        await loginPage.PreencherCadastro('Teste', 'Teste@teste.com');
        await loginPage.SubmeterCadastro();
        await loginPage.verificarEmailExistenteMensagem();
    });
})