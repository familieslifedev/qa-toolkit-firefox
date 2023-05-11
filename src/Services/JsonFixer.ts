import { copyFromClipboard, writeToClipboard } from "~Utils/Utils";
import { isJsonUrl, getJsonFromUrl } from "~Utils/JsonHelper";
import { isAccountPage } from "~Utils/urlHelper";

type FrontendDetails = {
    accountId?: string;
    leadId?: string;
    email?: string;
}

export class JsonFixer {
    private json: any = null;
    private frontendDetails: FrontendDetails = null;

    public async registerJson(): Promise<void> {
        const json = await copyFromClipboard();
            
        const parsedJson = isJsonUrl(json) ? getJsonFromUrl(json) : JSON.parse(json);
        if (!parsedJson) {
            throw new Error("JsonFixer: Failed to get JSON");
        }

        this.json = parsedJson;
    }

    public scrapeFrontendDetails(url: string): void {
        if (!isAccountPage(url)) throw new Error("JsonFixer: Needs to scrape from an Account page.");

        const accountId = this.scrapeAccountId();
        const email = this.scrapeEmail();
        const leadId = this.scrapeLeadId(); // TODO - get other lead IDs, rather than just the first

        this.frontendDetails = <FrontendDetails>{
            accountId: accountId,
            leadId: leadId,
            email: email
        }
    }

    public async fix(): Promise<void> {
        if (!this.json && !this.frontendDetails) {
            throw new Error("JsonFixer: JSON and frontend details both need to be set for fix.");
        }

        if (this.frontendDetails.accountId) this.json.plan.accountId = this.frontendDetails.accountId;
        if (this.frontendDetails.email) this.json.plan.email = this.frontendDetails.email;
        if (this.frontendDetails.leadId) this.json.plan.leadId = this.frontendDetails.leadId;

        const stringifiedJson: string = JSON.stringify(this.json);
        await writeToClipboard(stringifiedJson);
        this.resetData();
    }

    private getLeadIdFromElement(elem: HTMLElement): string {
        const l = elem.textContent.trim().split(" ");

        const type = l.pop(); // should we handle bedrooms and kitchens?
        let rawLead = l[0];

        const leadId = rawLead.startsWith("L") ? rawLead.substring(1) : rawLead;

        return leadId;
    }

    private scrapeAccountId(): string {
        const accountView: HTMLElement = document.getElementById("account-view");
        const accountId: string = accountView.childNodes[1].textContent.split(" ").pop();
        return accountId;
    }

    private scrapeEmail(): string {
        const email: string = document.getElementById("account-info-bar-email-link-value").textContent.trim();
        return email;
    }

    private scrapeLeadId(): string {
        const leads: NodeListOf<HTMLElement> = document.querySelectorAll(".account-view-lead-description");
        const leadId = this.getLeadIdFromElement(leads[0]);
        return leadId;
    }

    private resetData(): void {
        this.json = null;
        this.frontendDetails = null;
    }
}
