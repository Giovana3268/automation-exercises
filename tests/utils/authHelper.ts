import { Page } from '@playwright/test';
import LoginPage from '../page-objects/Login';
import { userCadastro } from './testData';

const LOGIN_URL = `${process.env.BASE_URL}/login`;

export async function criarContaELogar(page: Page) {
  const loginPage = new LoginPage(page);

  if (page.url() !== LOGIN_URL) {
    await loginPage.NavegarParaLogin();
  }

  await loginPage.PreencherCadastro(userCadastro.nome, process.env.EMAIL_CREATE_ACCOUNT!);
  await loginPage.SubmeterCadastro();
  await loginPage.preencherInformacoesAdicionais(process.env.USER_PASSWORD!);
  await loginPage.criarConta();
  await loginPage.verificarContaCriada();
}

export async function logarComUsuarioValido(page: Page) {
  const loginPage = new LoginPage(page);

  if (page.url() !== LOGIN_URL) {
    await loginPage.NavegarParaLogin();
  }

  await loginPage.realizarLogin(
    process.env.EMAIL_LOGIN!,
    process.env.USER_PASSWORD!
  );
  await loginPage.verificarUsuarioLogado();
}
