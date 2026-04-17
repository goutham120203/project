import { Locator, Page, expect } from '@playwright/test';

export class RetailerPage {
    readonly page: Page;
    readonly clientNameSelect: Locator;
    readonly clientVisibleNameInput: Locator;
    readonly outletSelect: Locator;
    readonly freshlookYes: Locator;
    readonly freshlookNo: Locator;
    readonly includeStores: Locator;
    readonly excludeStores: Locator;
    readonly ownerNumberInput: Locator;
    readonly bannerNameInput: Locator;
    readonly notesInput: Locator;
    readonly saveProfileButton: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.clientNameSelect = page.locator('#clientName');
        this.clientVisibleNameInput = page.locator('#clientVisibleName');
        this.outletSelect = page.locator('#retailerOutlet');
        this.freshlookYes = page.locator('#freshlookYes');
        this.freshlookNo = page.locator('#freshlookNo');
        this.includeStores = page.locator('#includeStores');
        this.excludeStores = page.locator('#excludeStores');
        this.ownerNumberInput = page.getByPlaceholder('Enter owner number');
        this.bannerNameInput = page.getByPlaceholder('Enter banner name');
        this.notesInput = page.locator('#notes');
        this.saveProfileButton = page.getByRole('button', { name: /save profile/i });
        this.cancelButton = page.getByRole('button', { name: /cancel/i });
    }

    async selectClientName(clientName: string): Promise<void> {
        await this.clientNameSelect.selectOption({ label: clientName });
    }

    async fillClientVisibleName(name: string): Promise<void> {
        await this.clientVisibleNameInput.fill(name);
    }

    async selectOutlet(outlet: string): Promise<void> {
        await this.outletSelect.selectOption({ label: outlet });
    }

    async chooseFreshlook(value: string): Promise<void> {
        const normalized = value.toLowerCase();

        if (normalized === 'yes') {
            await this.freshlookYes.check();
        } else if (normalized === 'no') {
            await this.freshlookNo.check();
        } else {
            throw new Error(`Invalid value for Freshlook: ${value}`);
        }
    }

    async chooseClosedAndSold(value: string): Promise<void> {
        const normalized = value.toUpperCase();

        if (normalized === 'INCLUDE') {
            await this.includeStores.check();
        } else if (normalized === 'EXCLUDE') {
            await this.excludeStores.check();
        } else {
            throw new Error(`Invalid value for ClosedAndSold: ${value}`);
        }
    }

    async fillOwnerNumber(ownerNo: string): Promise<void> {
        await this.ownerNumberInput.fill(ownerNo);
    }

    async fillBannerName(bannerName: string): Promise<void> {
        await this.bannerNameInput.fill(bannerName);
    }

    async fillNotes(notes: string): Promise<void> {
        await this.notesInput.fill(notes);
    }

    async saveProfile(): Promise<void> {
        await this.saveProfileButton.click();
    }

    async cancel(): Promise<void> {
        await this.cancelButton.click();
    }

    async errorClientName(): Promise<string> {
        return this.page.getByText(/Client selection is required\./i).innerText();
    }

    async errorClientVisibleName(): Promise<string> {
        return this.page.getByText(/Client visible name is required\./i).innerText();
    }

    async errorOutlet(): Promise<string> {
        return this.page.getByText(/Retailer outlet selection is required\./i).innerText();
    }

    async errorBannerField(): Promise<string> {
        return this.page.getByText(/Please fill in all banner fields\. Owner number must be greater than 0\./i).innerText();
    }

    async isFreshlookYesSelected(): Promise<boolean> {
        return this.freshlookYes.isChecked();
    }

    async isIncludeChecked(): Promise<boolean> {
        return this.includeStores.isChecked();
    }

    async isOutletListVisible(): Promise<boolean> {
        const isVisible = await this.outletSelect.isVisible();
        await  this.outletSelect.click();
        const optionCount = await this.outletSelect.locator('option').count();
        return isVisible && optionCount > 1;
    }

    async isAuditRMASectionVisible(): Promise<boolean> {
        await expect(this.page.getByText(/Audit \(RMA\)/i)).toBeVisible({ timeout: 5000 });
        return this.page.getByText(/Audit \(RMA\)/i).isVisible();
    }

    async isParentageSectionVisible(): Promise<boolean> {
        await expect(this.page.getByText(/Parentage/i)).toBeVisible({ timeout: 5000 });
        return this.page.getByText(/Parentage/i).isVisible();
    }

    async isCRMAOutletSectionVisible(): Promise<boolean> {
        await expect(this.page.getByText(/CRMA Outlet\(s\)/i)).toBeVisible({ timeout: 5000 });
        return this.page.getByText(/CRMA Outlet\(s\)/i).isVisible();
    }

    async errorAuditOption(): Promise<string> {
        return this.page.getByText(/Please select at least one audit option\./i).innerText();
    }

    async errorCRMAOutlet(): Promise<string> {
        return this.page.getByText(/Please select at least one CRMA outlet option\./i).innerText();
    }

    async getOwnerNumberValue(): Promise<string> {
        return this.ownerNumberInput.inputValue();
    }

    async isIncludeSelected(): Promise<boolean> {
        return this.includeStores.isChecked();
    }
}
