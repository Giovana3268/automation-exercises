import { expect, Page } from "@playwright/test";
import { BASE_URL } from "../utils/environment";

export default class ProdutosPage {
    constructor(private readonly page: Page) { }

    get menuProdutos() {
        return this.page.getByRole('link', { name: ' Products' });
    }

    get primeiroProduto() {
        return this.page.getByRole('link', { name: ' View Product' }).first();
    }

    get detalhesDoProduto() {
        return this.page.getByRole('link', { name: 'Write Your Review' });
    }

    get campoPesquisa() {
        return this.page.getByRole('textbox', { name: 'Search Product' });
    }

    get botaoPesquisar() {
        return this.page.locator('#submit_search');
    }

    get verificarProdutoPesquisado() {
        return this.page.getByText('Rs. 1500 Premium Polo T-').nth(1);
    }

    get posicionarMouseSobreProduto() {
        return this.page.getByText('Rs. 500 Blue Top Add to cart').first();
    }

    get botaoContinueShopping() {
        return this.page.getByRole('button', { name: 'Continue Shopping' });
    }

    get adicionarProdutoCarrinho() {
        return this.page.getByText('Add to cart').nth(1);
    }

    get posicionarMouseSobreProduto2() {
        return this.page.getByText('Rs. 400 Men Tshirt Add to cart').first();
    }

    get adicionarProdutoCarrinho2() {
        return this.page.getByText('Add to cart').nth(3);
    }

    get visualizarCarrinho() {
        return this.page.getByRole('link', { name: ' Cart' });
    }

    get quantidadeProdutoNoCarrinho() {
        return this.page.getByRole('row', { name: 'Product Image Blue Top Women' }).getByRole('button');
    }

    get campoQuantidade() {
        return this.page.locator('#quantity');
    }

    get botaoAddToCart() {
        return this.page.getByRole('button', { name: ' Add to cart' });
    }

    get removerProdutoCarrinho() {
        return this.page.locator('.cart_quantity_delete').first();
    }

    get produtoRemovido() {
        return this.page.getByRole('link', { name: 'Blue Top' });
    }

    get marcaEspecifica() {
        return this.page.getByRole('link', { name: '(6) Polo' });
    }

    get produtosDaMarca() {
        return this.page.getByRole('heading', { name: 'Brand - Polo Products' });
    }

    get paginaDeProdutos() {
        return this.page.getByRole('heading', { name: 'All Products' });
    }

    get menuLoginSignup() {
        return this.page.getByRole('link', { name: ' Signup / Login' });
    }

    get produtoPesquisadoEspecifico() {
        return this.page.getByText('Rs. 1299 Pure Cotton V-Neck T').first();
    }

    get botaoAdicionarProdutoPesquisado() {
        return this.page.getByText('Add to cart').nth(1);
    }

    get verificarProdutoEspecificoAdicionadoNoCarrinho() {
        return this.page.getByRole('link', { name: 'Pure Cotton V-Neck T-Shirt' });
    }

    get inputNomeAvaliacao() {
        return this.page.getByRole('textbox', { name: 'Your Name' })
    }

    get inputEmailAvaliacao() {
        return this.page.getByRole('textbox', { name: 'Email Address', exact: true });
    }

    get textareaAvaliacao() {
        return this.page.getByRole('textbox', { name: 'Add Review Here!' });
    }

    get botaoSubmitAvaliacao() {
        return this.page.getByRole('button', { name: 'Submit' });
    }

    get mensagemDeAvaliacaoEnviada() {
        return this.page.getByText('Thank you for your review.');
    }

    public async NavegarParaProdutos() {
        await this.page.goto(BASE_URL);
        await this.menuProdutos.click();
    }

    public async SelecionarProduto() {
        await this.primeiroProduto.click();
    }

    public async VerificarDetalhesDoProduto() {
        await expect(this.detalhesDoProduto).toBeVisible();
    }

    public async PesquisarProduto(produto: string) {
        await this.campoPesquisa.fill(produto);
        await this.botaoPesquisar.click();
    }

    public async verificarProdutoEncontrado() {
        await expect(this.verificarProdutoPesquisado).toBeVisible({ timeout: 5000 });
    }

    public async AdicionarProdutosAoCarrinho() {
        await this.posicionarMouseSobreProduto.hover();
        await this.adicionarProdutoCarrinho.click();
        await expect(this.botaoContinueShopping).toBeVisible();
        await this.botaoContinueShopping.click();
        await this.posicionarMouseSobreProduto2.hover();
        await expect(this.adicionarProdutoCarrinho2).toBeVisible();
        await this.adicionarProdutoCarrinho2.click();
        await expect(this.botaoContinueShopping).toBeVisible();
        await this.botaoContinueShopping.click();
    }

    public async VerificarProdutoAdicionadoAoCarrinho(qntd: string) {
        await this.visualizarCarrinho.click();
        await expect(this.quantidadeProdutoNoCarrinho).toHaveText(qntd);
    }

    public async adicionarMultiplasUnidades(qntd: string) {
        await expect(this.campoQuantidade).toBeVisible();
        await this.campoQuantidade.fill(qntd);
        await this.botaoAddToCart.click();
        await this.visualizarCarrinho.click();
    }

    public async RemoverProdutoDoCarrinho() {
        await this.removerProdutoCarrinho.click();
    }

    public async VerificarProdutoRemovidoDoCarrinho() {
        await expect(this.produtoRemovido).not.toBeVisible();
    }

    public async selecionarMarcaEspecifica() {
        await this.marcaEspecifica.click();
    }

    public async verificarProdutoDaMarca() {
        await expect(this.produtosDaMarca).toBeVisible({timeout: 5000});
    }

    public async verificarPaginaDeProdutos() {
        await expect(this.paginaDeProdutos).toBeVisible();
    }

    public async selecionarProdutoPesquisado() {
        await this.produtoPesquisadoEspecifico.hover();
        await this.botaoAdicionarProdutoPesquisado.click();
        await expect(this.botaoContinueShopping).toBeVisible();
        await this.botaoContinueShopping.click();
    }

    public async verificarProdutoEspecificoAdicionadoAoCarrinho() {
        await this.visualizarCarrinho.click();
        await expect(this.verificarProdutoEspecificoAdicionadoNoCarrinho).toBeVisible({ timeout: 5000 });
    }

    public async logarComUsuario() {
        await this.menuLoginSignup.click();
    }

    async preencherAvaliacao(nome: string, email: string, texto: string) {
        await this.inputNomeAvaliacao.fill(nome);
        await this.inputEmailAvaliacao.fill(email);
        await this.textareaAvaliacao.fill(texto);
        await this.botaoSubmitAvaliacao.click();
    }

    public async verificarMensagemDeAvaliacaoEnviada() {
        await expect(this.mensagemDeAvaliacaoEnviada).toBeVisible();
    }
}