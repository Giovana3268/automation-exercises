import { expect, Page } from "@playwright/test";
import { BASE_URL } from "../utils/environment";
import { preencherInformacoesAdicionais } from "../utils/testData";

export default class LoginPage {
    constructor(private readonly page: Page) {}

    get menuLoginSignup() {
        return this.page.getByRole('link', { name: ' Signup / Login' });
    }

    get nomeCadastro() {
        return this.page.getByRole('textbox', { name: 'Name' });
    }

    get emailCadastro() {
        return this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
    }

    get botaoSignup() {
        return this.page.getByRole('button', { name: 'Signup' });
    }

    get passwordCadastro() {
        return this.page.getByRole('textbox', { name: 'Password *' });
    }

    get firstNameCadastro() {
        return this.page.getByRole('textbox', { name: 'First name *' });
    }

    get lastNameCadastro() {
        return this.page.getByRole('textbox', { name: 'Last name *' });
    }

    get addressCadastro() {
        return this.page.getByRole('textbox', { name: 'Address * (Street address, P.' });
    }

    get countryCadastro() {
        return this.page.getByRole('combobox', { name: 'Country *' });
    }

    get stateCadastro() {
        return this.page.getByRole('textbox', { name: 'State *' });
    }

    get cityCadastro() {    
        return this.page.getByRole('textbox', { name: 'City * Zipcode *' });
    }

    get zipCodeCadastro() {
        return this.page.locator('#zipcode');
    }

    get mobileNumberCadastro() {
        return this.page.getByRole('textbox', { name: 'Mobile Number *' });
    }

    get criarContaBotao() {
        return this.page.getByRole('button', { name: 'Create Account' });
    }

    get contaCriadaMensagem() {
        return this.page.getByText('Account Created!');
    }

    get botaoContinuar() {
        return this.page.getByRole('link', { name: 'Continue' });
    }

    get emailLogin() {
        return this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
    }

    get senhaLogin() {
        return this.page.getByRole('textbox', { name: 'Password' });
    }

    get botaoLogin() {
        return this.page.getByRole('button', { name: 'Login' });
    }

    get verificarLogin() {
        return this.page.getByRole('link', { name: ' Logout' });
    }

    get mensagemErroLogin() {
        return this.page.getByText('Your email or password is');
    }

    get botaoLogout() {
        return this.page.getByRole('link', { name: ' Logout' });
    }

    get verificarPageLogout() {
        return this.page.getByRole('link', { name: ' Signup / Login' });
    }

    get mensagemEmailExistente() {
        return this.page.getByText('Email Address already exist!');
    }

    get excluirUsuarioBotao() {
        return this.page.getByRole('link', { name: 'Delete Account' });
    }

    get usuarioExcluidoMensagem() {
        return this.page.getByText('Account Deleted!');
    }

    public async NavegarParaLogin() {
        await this.page.goto(BASE_URL);
        await this.menuLoginSignup.click();
    } 
    
    public async PreencherCadastro(nome: string, email: string) {
        await this.nomeCadastro.fill(nome);
        await this.emailCadastro.fill(email);
    }

    public async SubmeterCadastro() {
        await this.botaoSignup.click();
    }

    public async preencherInformacoesAdicionais(password: string){
        await expect(this.passwordCadastro).toBeVisible({timeout: 10000});
        await this.passwordCadastro.fill(password);
        await this.firstNameCadastro.fill(preencherInformacoesAdicionais.nome);
        await this.lastNameCadastro.fill(preencherInformacoesAdicionais.sobrenome);
        await this.addressCadastro.fill(preencherInformacoesAdicionais.endereco);
        await this.countryCadastro.selectOption({ label: preencherInformacoesAdicionais.pais });
        await this.stateCadastro.fill(preencherInformacoesAdicionais.estado);
        await this.cityCadastro.fill(preencherInformacoesAdicionais.cidade);
        await this.zipCodeCadastro.fill(preencherInformacoesAdicionais.cep);
        await this.mobileNumberCadastro.fill(preencherInformacoesAdicionais.numeroCelular);    
    }

    public async criarConta() {
        await this.criarContaBotao.click();
    }

    public async verificarContaCriada() {
        await expect(this.contaCriadaMensagem).toBeVisible();
        await this.botaoContinuar.click();
    }

    public async realizarLogin(email: string, senha: string) {
        await this.emailLogin.fill(email);
        await this.senhaLogin.fill(senha);
        await this.botaoLogin.click();
    }

    public async verificarUsuarioLogado() {
        await expect(this.verificarLogin).toBeVisible();
    }

    public async verificarMensagemErroLogin() {
        await expect(this.mensagemErroLogin).toBeVisible();
    }

    public async fazerLogout() {
        await this.botaoLogout.click();
    }

    public async verificarLogout() {
        await expect(this.verificarPageLogout).toBeVisible();
    }

    public async verificarEmailExistenteMensagem() {
        await expect(this.mensagemEmailExistente).toBeVisible();
    }

    public async excluirUsuarioLogado() {
        await this.excluirUsuarioBotao.click();
    }

    public async verificarSeUsuarioFoiExcluido() {
       await expect(this.usuarioExcluidoMensagem).toBeVisible({timeout: 10000});
    }
}