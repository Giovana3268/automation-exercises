import test from "@playwright/test";
import ProdutosPage from "../page-objects/Produtos";
import { logarComUsuarioValido } from "../utils/authHelper";
import { dadosAvaliacao } from "../utils/testData";

test.describe('Página de produtos', () => {
    let produtosPage: ProdutosPage;

    test.beforeEach(async ({ page }) => {
        await page.route(/.*(ads|doubleclick|googlesyndication|adservice|tracking|analytics|fbq|pixel).*/, route => {
            route.abort();
        });

        produtosPage = new ProdutosPage(page);
        await produtosPage.NavegarParaProdutos();
    });

    test('Caso de teste 8: Verificar todos os produtos e a página de detalhes do produto', async () => {
        await produtosPage.SelecionarProduto();
        await produtosPage.VerificarDetalhesDoProduto();
    });

    test('Caso de teste 9: Pesquisar um produto específico', async () => {
        await produtosPage.PesquisarProduto('T-shirt');
        await produtosPage.verificarProdutoEncontrado();
    });

    test('Caso de teste 12: Adicionar produtos ao carrinho', async () => {
        await produtosPage.AdicionarProdutosAoCarrinho();
        await produtosPage.VerificarProdutoAdicionadoAoCarrinho('1');
    });

    test('Caso de teste 13: Adicionar 4 produtos iguais ao carrinho', async () => {
        await produtosPage.SelecionarProduto();
        await produtosPage.adicionarMultiplasUnidades('4');
        await produtosPage.VerificarProdutoAdicionadoAoCarrinho('4');
    });

    test('Caso de teste 17: Deve remover produto adicionado ao carrinho', async () => {
        await produtosPage.AdicionarProdutosAoCarrinho();
        await produtosPage.VerificarProdutoAdicionadoAoCarrinho('1');
        await produtosPage.RemoverProdutoDoCarrinho();
        await produtosPage.VerificarProdutoRemovidoDoCarrinho();
    });

    test('Caso de teste 19: Deve adicionar produto de uma marca especifica ao carrinho', async () => {
        await produtosPage.selecionarMarcaEspecifica();
        await produtosPage.verificarProdutoDaMarca();
    });

    test('Caso de teste 20: Deve pesquisar produto e verificar carrinho após login', async ({ page }) => {
        await produtosPage.verificarPaginaDeProdutos();
        await produtosPage.PesquisarProduto('T-shirt');
        await produtosPage.verificarProdutoEncontrado();
        await produtosPage.selecionarProdutoPesquisado();
        await produtosPage.verificarProdutoEspecificoAdicionadoAoCarrinho();
        await produtosPage.logarComUsuario();
        await logarComUsuarioValido(page);
        await produtosPage.verificarProdutoEspecificoAdicionadoAoCarrinho();
    });

    test('Caso de teste 21: Deve adicionar avaliação para o produto', async ({ page }) => {
        await produtosPage.verificarPaginaDeProdutos();
        await produtosPage.SelecionarProduto();
        await produtosPage.preencherAvaliacao(
            dadosAvaliacao.nome,
            dadosAvaliacao.email,
            dadosAvaliacao.avaliacao
        );
        await produtosPage.verificarMensagemDeAvaliacaoEnviada();
    });

})