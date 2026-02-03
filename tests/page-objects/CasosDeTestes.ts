import { expect, Page } from "@playwright/test";
import { BASE_URL } from "../utils/environment";

export default class CasosDeTestesPage {
    constructor(private readonly page: Page) { }

    get menuCasosDeTeste() {
        return this.page.getByRole('link', { name: ' Test Cases' });
    }

    public async NavegarParaCasosDeTeste() {
        await this.page.goto(BASE_URL);
        await this.menuCasosDeTeste.click();
    }

    public async verificarNavegacaoCasosDeTeste() {
        await expect(this.page).toHaveURL(/\/test_cases$/);
    }
}