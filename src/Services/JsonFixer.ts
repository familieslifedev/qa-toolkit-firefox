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

    public scrapeFrontendDetails(url: string, leadName: string): void {
        if (!isAccountPage(url)) return;

        const accountId = this.scrapeAccountId();
        const email = this.scrapeEmail();
        const leadId = this.scrapeLeadId(leadName);

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

    public getLeads(url: string): Array<string> {
        if (!isAccountPage(url)) return new Array<string>();

        const leads: Array<HTMLElement> = Array.from(document.querySelectorAll(".account-view-lead-description")) as Array<HTMLElement>;
        if (!leads) {
            console.log("No leads");
            return new Array<string>();
        }
    
        const leadNames: Array<string> = leads.map(lead => {
            return lead.outerText.trim().replace(/^\s\n+|\s\n+$/g,'');
        });

        return leadNames;
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

    private scrapeLeadId(leadName: string): string {
        const leads: Array<HTMLElement> = Array.from(document.querySelectorAll(".account-view-lead-description"));
        const chosenLead: HTMLElement = this.selectLead(leads, leadName);

        const leadId = this.getLeadIdFromElement(chosenLead);
        return leadId;
    }

    private selectLead(leads: Array<HTMLElement>, leadName: string): HTMLElement {
        const leadIndex = leads.findIndex(elem => {
            return elem.outerText.trim() === leadName;
        });
        if (leadIndex !== -1) {
            return leads[leadIndex];
        }

        throw new Error("selectLead: No valid leads");
    }

    private getLeadIdFromElement(elem: HTMLElement): string {
        const l = elem.outerText.trim().split(" ");

        let rawLead = l[0]?.replace(/^\s\n+|\s\n+$/g,'');

        const leadId = rawLead.startsWith("L") ? rawLead.substring(1) : rawLead;

        return leadId;
    }

    private resetData(): void {
        this.json = null;
        this.frontendDetails = null;
    }
}
