import { copyFromClipboard, writeToClipboard } from "~Utils/Utils";
import { isJsonUrl, getJsonFromUrl } from "~Utils/JsonHelper";

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
            
        // nope - not what i wanted
        const parsedJson = isJsonUrl(json) ? getJsonFromUrl(json) : JSON.parse(json);

        if (!parsedJson) {
            throw new Error("JsonFixer: Failed to get JSON");
        }

        this.json = parsedJson;
    }

    public scrapeFrontendDetails(url: string): void {
        // url needs to be account view
        // https://frontend.project5.wrenkitchens.com/accounts/account/view/8183904

        const accountId = this.scrapeAccountId();
        const email = this.scrapeEmail();
        const leadId = this.scrapeLeadId(); // TODO - get other lead IDs, rather than just the first

        this.frontendDetails = <FrontendDetails>{
            accountId: accountId,
            leadId: leadId,
            email: email
        }
    }

    public async fix(): Promise<void> { // should return fixed json
        if (!this.json && !this.frontendDetails) {
            throw new Error("JsonFixer: JSON and frontend details both need to be set to fix.");
        }

        if (this.frontendDetails.accountId) this.json.plan.accountId = this.frontendDetails.accountId;
        if (this.frontendDetails.email) this.json.plan.email = this.frontendDetails.email;
        if (this.frontendDetails.leadId) this.json.plan.leadId = this.frontendDetails.leadId;

        await writeToClipboard(this.json);
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
