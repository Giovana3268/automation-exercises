import { expect, Page } from "@playwright/test";
import { BASE_URL } from "../utils/environment";
import { dadosCartao } from '../utils/testData';

export default class PaginaIncialPage {
    constructor(private readonly page: Page) { }

    get assinaturaRodape() {
        return this.page.getByRole('textbox', { name: 'Your email address' });
    }

    get botaoAssinar() {
        return this.page.locator('#subscribe');
    }

    get mensagemSucessoAssinatura() {
        return this.page.getByText('You have been successfully');
    }

    get visualizarProduto() {
        return this.page.getByRole('link', { name: ' View Product' }).first();
    }

    get adicionarAoCarrinho() {
        return this.page.getByRole('button', { name: ' Add to cart' });
    }

    get botaoContinuarComprando() {
        return this.page.getByRole('button', { name: 'Continue Shopping' });
    }

    get visualizarCarrinho() {
        return this.page.getByRole('link', { name: ' Cart' });
    }

    get botaoCheckout() {
        return this.page.getByText('Proceed To Checkout');
    }

    get linkLoginCadastro() {
        return this.page.getByRole('link', { name: 'Register / Login' });
    }

    get finalizarCompraLogadoBotao() {
        return this.page.getByText('Place Order');
    }

    get nomeDoCartao() {
        return this.page.locator('input[name="name_on_card"]');
    }

    get numeroDoCartao() {
        return this.page.locator('input[name="card_number"]');
    }

    get cvcDoCartao() {
        return this.page.getByRole('textbox', { name: 'ex.' });
    }

    get mesDeValidadeDoCartao() {
        return this.page.getByRole('textbox', { name: 'MM' });
    }

    get anoDeValidadeDoCartao() {
        return this.page.getByRole('textbox', { name: 'YYYY' });
    }

    get botaoPagarEConfirmarPedido() {
        return this.page.getByRole('button', { name: 'Pay and Confirm Order' });
    }
    get mensagemPedidoSucesso() {
        return this.page.getByText('Congratulations! Your order has been confirmed!');
    }

    get mensagemContaExcluidaComSucesso() {
        return this.page.getByText('Account Deleted!');
    }

    get categoriaWomen() {
        return this.page.getByRole('link', { name: 'Women' });
    }

    get subcategoriaTops() {
        return this.page.getByRole('link', { name: 'Tops' });
    }

    get subcategoriaDress() {
        return this.page.getByRole('heading', { name: 'Women - Tops Products' });
    }

    get categoriaMen() {
        return this.page.getByRole('link', { name: ' Men' });
    }

    get subcategoriaJeans() {
        return this.page.getByRole('link', { name: 'Jeans' });
    }

    get subcategoriaMen() {
        return this.page.getByRole('heading', { name: 'Men - Jeans Products' });
    }

    get verificarParteDeProdutosRecomendados() {
        return this.page.getByRole('heading', { name: 'recommended items' });
    }

    get adicionarProdutoRecomendadosNoCarrinho() {
        return this.page.locator('.item.active > div > .product-image-wrapper > .single-products > .productinfo > .btn').first();
    }

    get produtoRecomendadoAdicionadoNoCarrinho() {
        return this.page.getByRole('link', { name: 'Stylish Dress' });
    }

    get botaoScrollTopo() {
        return this.page.locator('#scrollUp');
    }

    get topoDoSite() {
        return this.page.getByRole('link', { name: 'Website for automation' });
    }

    get excluirUsuarioBotao() {
        return this.page.getByRole('link', { name: 'Delete Account' });
    }

    get usuarioExcluidoMensagem() {
        return this.page.getByText('Account Deleted!');
    }

    get detalhesEnderecoDaEntrega() {
        return this.page.locator('#address_delivery').getByText('Rua das Flores,');
    }

    get detalhesEnderecoDaCobrança() {
        return this.page.locator('#address_invoice').getByText('Rua das Flores,');
    }

    get botaoFazerPedidio() {
        return this.page.getByRole('link', { name: 'Place Order' });
    }

    get botaoBaixarFatura() {
        return this.page.getByRole('link', { name: 'Download Invoice' });
    }

    get botaoContinueAccountDeletec() {
        return this.page.getByRole('link', { name: 'Continue' });
    }

    public async NavegarParaHome() {
        await this.page.goto(BASE_URL);
    }

    public async increverNaAssinatura(email: string) {
        await this.assinaturaRodape.fill(email);
        await this.botaoAssinar.click();
    }

    public async VerificarInscricaoComSucesso() {
        await expect(this.mensagemSucessoAssinatura).toBeVisible();
    }

    public async adicionarProdutoAoCarrinho() {
        await this.visualizarProduto.click();
        await this.adicionarAoCarrinho.click();
        await expect(this.botaoContinuarComprando).toBeVisible({timeout: 30000});
        await this.botaoContinuarComprando.click();
    }

    public async finalizarCompra() {
        await this.visualizarCarrinho.click();
        await this.botaoCheckout.click();
    }

    public async irParaLoginCadastroParaFinalizarCompra() {
        await this.linkLoginCadastro.click();
        await expect(this.page).toHaveURL(/.*\/login/);
    }

    public async finalizarCompraLogado() {
        await this.finalizarCompraLogadoBotao.click();
    }

    public async preencherDetalhesPagamento() {
        await expect(this.nomeDoCartao).toBeVisible({ timeout: 50000 });
        await this.nomeDoCartao.fill(dadosCartao.nomeDoCartao);
        await this.numeroDoCartao.fill(dadosCartao.numeroDoCartao);
        await this.cvcDoCartao.fill(dadosCartao.cvcDoCartao);
        await this.mesDeValidadeDoCartao.fill(dadosCartao.mesDeValidade);
        await this.anoDeValidadeDoCartao.fill(dadosCartao.anoDeValidade);
    }

    public async pagarEConfirmarPedido() {
        await this.botaoPagarEConfirmarPedido.click();
    }

    public async verificarPedidoRealizadoComSucesso() {
        await expect(this.mensagemPedidoSucesso).toBeVisible({ timeout: 30000 });
    }

    public async selecionarCategoriaF() {
        await this.categoriaWomen.click();
        await this.subcategoriaTops.click();
    }

    public async verificarCategoriaSelecionadaF() {
        await expect(this.subcategoriaDress).toBeVisible();
    }

    public async selecionarCategoriaM() {
        await this.categoriaMen.click();
        await this.subcategoriaJeans.click();
    }

    public async VerificarCategoriaSelecionadaM() {
        await expect(this.subcategoriaMen).toBeVisible();
    }

    public async adicionarUmProdutoRecomendadoAoCarrinho() {
        await this.verificarParteDeProdutosRecomendados.hover();
        await this.adicionarProdutoRecomendadosNoCarrinho.click();
        await this.botaoContinuarComprando.click();
    }

    public async VerificarProdutoRecomendadoAdicionadoNoCarrinho() {
        await this.visualizarCarrinho.click();
        await expect(this.produtoRecomendadoAdicionadoNoCarrinho).toBeVisible();
    }

    public async irParaAssinatura() {
        await this.assinaturaRodape.scrollIntoViewIfNeeded();
    }

    public async subirParaTopoDaPagina() {
        await this.botaoScrollTopo.click();
        await expect(this.topoDoSite).toBeVisible();
    };

    public async subirParaTopoDaPaginaSemBotao() {
        await this.topoDoSite.hover();
        await expect(this.topoDoSite).toBeVisible();
    }

    public async excluirUsuarioLogado() {
        await this.excluirUsuarioBotao.click();
    }

    public async verificarSeUsuarioFoiExcluido() {
        await expect(this.usuarioExcluidoMensagem).toBeVisible({ timeout: 30000 });
    }

    public async verificarEnderecoNaFinalizacaoCompra() {
        await expect(this.detalhesEnderecoDaEntrega).toBeVisible({ timeout: 30000 });

        const textoEntrega = await this.detalhesEnderecoDaEntrega.innerText();
        await expect(this.detalhesEnderecoDaCobrança).toHaveText(textoEntrega);
    }

    public async clicarEmFazerPedido() {
        await this.botaoFazerPedidio.click();
    }

    public async baixarFatura() {
        const downloadPromise = this.page.waitForEvent('download');
        await this.botaoBaixarFatura.click();
        const download = await downloadPromise;

        expect(download.suggestedFilename()).toContain('invoice');
    }

    public async clicarBotaoContinueAccountDeleted() {
        await this.botaoContinueAccountDeletec.click();
    }
}