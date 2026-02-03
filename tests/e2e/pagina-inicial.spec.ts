import test from "@playwright/test";
import PaginaIncialPage from "../page-objects/PaginaIncial";
import { criarContaELogar, logarComUsuarioValido } from "../utils/authHelper";

test.describe('Página Home', () => {
    let paginaIncialPage: PaginaIncialPage;

    test.beforeEach(async ({ page }) => {
        await page.route(/.*(ads|doubleclick|googlesyndication|adservice|tracking|analytics|fbq|pixel).*/, route => {
            route.abort();
        });

        paginaIncialPage = new PaginaIncialPage(page);
        await paginaIncialPage.NavegarParaHome();
    });

    test('Caso de teste 10: Verificar assinatura na página inicial', async () => {
        await paginaIncialPage.increverNaAssinatura('teste@jihgfdsu.com');
        await paginaIncialPage.VerificarInscricaoComSucesso();
    });

    test('Caso de teste 14: Fazer pedido e registrar-se na página de checkout', async ({ page }) => {
        await paginaIncialPage.adicionarProdutoAoCarrinho();
        await paginaIncialPage.finalizarCompra();
        await paginaIncialPage.irParaLoginCadastroParaFinalizarCompra();
        await criarContaELogar(page);
        await paginaIncialPage.finalizarCompra();
        await paginaIncialPage.finalizarCompraLogado();
        await paginaIncialPage.preencherDetalhesPagamento();
        await paginaIncialPage.pagarEConfirmarPedido();
        await paginaIncialPage.verificarPedidoRealizadoComSucesso();
        await paginaIncialPage.excluirUsuarioLogado();
        await paginaIncialPage.verificarSeUsuarioFoiExcluido();
    });

    test('Caso de teste 15: Deve fazer resgistro de conta e finalizar uma compra', async ({ page }) => {
        await criarContaELogar(page);
        await paginaIncialPage.adicionarProdutoAoCarrinho();
        await paginaIncialPage.finalizarCompra();
        await paginaIncialPage.finalizarCompraLogado();
        await paginaIncialPage.preencherDetalhesPagamento();
        await paginaIncialPage.pagarEConfirmarPedido();
        await paginaIncialPage.verificarPedidoRealizadoComSucesso();
        await paginaIncialPage.excluirUsuarioLogado();
        await paginaIncialPage.verificarSeUsuarioFoiExcluido();
    });

    test('Caso de teste 16: Deve fazer login e finalizar uma compra', async ({ page }) => {
        await logarComUsuarioValido(page);
        await paginaIncialPage.adicionarProdutoAoCarrinho();
        await paginaIncialPage.finalizarCompra();
        await paginaIncialPage.finalizarCompraLogado();
        await paginaIncialPage.preencherDetalhesPagamento();
        await paginaIncialPage.pagarEConfirmarPedido();
        await paginaIncialPage.verificarPedidoRealizadoComSucesso();
        //await paginaIncialPage.excluirUsuarioLogado();
        //await paginaIncialPage.verificarSeUsuarioFoiExcluido();
    });

    test('Caso de teste 18: Deve visualizar produtos de uma categoria', async () => {
        await paginaIncialPage.selecionarCategoriaF();
        await paginaIncialPage.verificarCategoriaSelecionadaF();
        await paginaIncialPage.selecionarCategoriaM();
        await paginaIncialPage.VerificarCategoriaSelecionadaM();
    });

    test('Caso de teste 22: Deve adicionar um produto recomendado ao carrinho', async () => {
        await paginaIncialPage.adicionarUmProdutoRecomendadoAoCarrinho();
        await paginaIncialPage.VerificarProdutoRecomendadoAdicionadoNoCarrinho();
    });

    test('Caso de teste 23: Deve verificar os detalhes de endereço na página de finalização da compra', async ({ page }) => {
        await criarContaELogar(page);
        await paginaIncialPage.adicionarProdutoAoCarrinho();
        await paginaIncialPage.finalizarCompra();
        await paginaIncialPage.verificarEnderecoNaFinalizacaoCompra();
        await paginaIncialPage.excluirUsuarioLogado();
        await paginaIncialPage.verificarSeUsuarioFoiExcluido();
        await paginaIncialPage.clicarBotaoContinueAccountDeleted();
    });

    test('Caso de teste 24: Deve baixar a fatura após a ordem de compra', async ({ page }) => {
        await paginaIncialPage.adicionarProdutoAoCarrinho();
        await paginaIncialPage.finalizarCompra();
        await paginaIncialPage.irParaLoginCadastroParaFinalizarCompra();
        await criarContaELogar(page);
        await paginaIncialPage.finalizarCompra();
        await paginaIncialPage.clicarEmFazerPedido();
        await paginaIncialPage.preencherDetalhesPagamento();
        await paginaIncialPage.pagarEConfirmarPedido();
        await paginaIncialPage.baixarFatura();
        await paginaIncialPage.excluirUsuarioLogado();
        await paginaIncialPage.verificarSeUsuarioFoiExcluido();
        await paginaIncialPage.clicarBotaoContinueAccountDeleted();
    });

    test('Caso de teste 25: Deve verificar a funcionalidade e rolagem para cima usando o botão de seta e rolagem para baixo', async () => {
        await paginaIncialPage.irParaAssinatura();
        await paginaIncialPage.subirParaTopoDaPagina();
    });

    test('Caso de teste 26: Deve verificar a funcionalidade e rolagem para cima sem usar o botão de seta e rolagem para baixo', async () => {
        await paginaIncialPage.irParaAssinatura();
        await paginaIncialPage.subirParaTopoDaPaginaSemBotao();
    });
})