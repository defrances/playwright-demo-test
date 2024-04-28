import { faker } from '@faker-js/faker';

interface ScanningIssues {
    errorText: string[];
    errorTypeName: string[];
    lastChanged: string[];
    cfgNName: string[];
}

interface MetaData {
    assetKey: string;
    installationKey: string;
    assetTypeName: string;
    parentKey: string;
    parentPath: string;
    hasChildren: boolean;
    scanningIssues: ScanningIssues;
    assetDuplicatedKey: string;
    ipLocationKey: string;
    deleted: boolean;
}

interface Asset {
    meta: MetaData;
    errors: boolean;
    assetName: string;
    assetDuplicatedKey: boolean;
    assetTypeName: string;
    assetDomain: string;
    ipAddress: string;
    mac: string;
    manufacturer: string;
    model: string;
    serialNumber: string;
    installationName: string;
    ipLocationName: string;
    warrantyDate: string;
    stateName: string;
    firstSeen: string;
    lastSeen: string;
}

interface AnalyticField {
    id: string;
    alias: string;
    __typename: string;
}

interface AnalyticListResponse {
    current: string;
    next: string;
    total: number;
    items: Asset[];
    columns: AnalyticField[];
    __typename: string;
}

interface Site {
    analyticListResponse: AnalyticListResponse;
    __typename: string;
}

interface Data {
    site: Site;
}

export class DataGenerator {
    constructor(private domain: string) {}

    generateFakeData(count: number): { data: Data } {
        const items: Asset[] = [];
        for (let i = 0; i < count; i++) {
            items.push(this.createAsset());
        }

        return {
            data: {
                site: {
                    analyticListResponse: {
                        current: faker.string.uuid(),
                        next: faker.string.uuid(),
                        total: count,
                        items: items,
                        columns: [
                            { id: "errors", alias: "Scan issues", __typename: "AnalyticField" },                            
                        ],
                        __typename: "AnalyticResponse"
                    },
                    __typename: "Site"
                }
            }
        };
    }

    private createAsset(): Asset {
        return {
            meta: {
                assetKey: faker.string.uuid(),
                installationKey: faker.string.uuid(),
                assetTypeName: "Windows",
                parentKey: "",
                parentPath: "",
                hasChildren: false,
                scanningIssues: {
                    errorText: [],
                    errorTypeName: [],
                    lastChanged: [],
                    cfgNName: []
                },
                assetDuplicatedKey: "",
                ipLocationKey: faker.string.uuid(),
                deleted: false,
            },
            errors: faker.datatype.boolean(),
            assetName: faker.string.hexadecimal({ length: 12 }),
            assetDuplicatedKey: false,
            assetTypeName: "Windows",
            assetDomain: this.domain,
            ipAddress: faker.internet.ip(),
            mac: faker.internet.mac(),
            manufacturer: "Microsoft Corporation",
            model: "Original State",
            serialNumber: faker.string.hexadecimal({ length: 12 }),
            installationName: "Installation-V2",
            ipLocationName: "IP Location-Test",
            warrantyDate: faker.date.future().toISOString(),
            stateName: "Active",
            firstSeen: faker.date.past().toISOString(),
            lastSeen: faker.date.recent().toISOString(),
        };
    }

    updateAssetDomain(newDomain: string): void {
        this.domain = newDomain;
    }
}