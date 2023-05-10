
type FrontendDetails = {
    accountId?: string;
    leadId?: string;
    email?: string;
}

class JsonFixer {
    private json: any = null;
    private frontendDetails: FrontendDetails = null;

    public registerJson(json: any): void {
        // check whether this is link or object
            // if link, consume and turn into object\
            
        this.json = json;
    }

    public scrapeFrontendDetails(url: string): void {
        const deets: FrontendDetails = {
            accountId: "123666",
            leadId: "678",
            email: "moose@goose.com"
        };

        this.frontendDetails = deets;
    }

    public fix(): any { // should return fixed json
        if (!this.json && !this.frontendDetails) {
            throw new Error("JsonFixer: JSON and frontend details both need to be set to fix.");
        }

        if (this.frontendDetails.accountId) this.json.plan.accountId = this.frontendDetails.accountId;
        if (this.frontendDetails.email) this.json.plan.email = this.frontendDetails.email;
        if (this.frontendDetails.leadId) this.json.plan.leadId = this.frontendDetails.leadId;

        return this.json;
    }
}
