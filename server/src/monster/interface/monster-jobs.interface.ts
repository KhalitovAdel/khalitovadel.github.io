export interface ExternalIdentifier {
    identifierName: string;
    identifierValue: string;
}

export interface NumberOfEmployees {
    unitText: string;
}

export interface HiringOrganization {
    name: string;
    description: string;
    url: string;
    foundingDate: string;
    numberOfEmployees: NumberOfEmployees;
    logo: string;
}

export interface Identifier {
    name: string;
    value: string;
}

export interface Address {
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
    streetAddress: string;
}

export interface Geo {
    latitude: string;
    longitude: string;
}

export interface JobLocation {
    address: Address;
    geo: Geo;
}

export interface Value {
    unitText: string;
    minValue?: number;
    maxValue?: number;
}

export interface BaseSalary {
    currency: string;
    value: Value;
}

export interface JobPosting {
    description: string;
    url: string;
    datePosted: Date;
    hiringOrganization: HiringOrganization;
    identifier: Identifier;
    jobLocation: JobLocation[];
    occupationalCategory: string;
    title: string;
    industry: string;
    baseSalary: BaseSalary;
    employmentType: string[];
    salaryCurrency: string;
    validThrough?: Date;
    educationRequirements: string;
}

export interface Provider {
    code: string;
    name: string;
}

export interface Apply {
    applyType: string;
    applyUrl: string;
    applyPath: string;
    resolvedRedirectUrl: string;
    onsiteApplyEmail: string;
}

export interface Language {
    languageCode: string;
}

export interface Mesco {
    id: string;
}

export interface Address2 {
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
}

export interface Geo2 {
    latitude: string;
    longitude: string;
}

export interface PostalAddress {
    address: Address2;
    geo: Geo2;
}

export interface NormalizedJobLocation {
    postalAddress: PostalAddress;
    locationId: string;
    countryCode: string;
}

export interface CompanyKb {
    normalizedCompanyName: string;
    normalizedCompanyGuid: string;
    code: string;
}

export interface NormalizedTitle {
    title: string;
}

export interface CurrencyCode {
    name: string;
    id: number;
}

export interface SalaryBaseType {
    name: string;
    id: number;
}

export interface NormalizedSalary {
    currencyCode: CurrencyCode;
    salaryBaseType: SalaryBaseType;
}

export interface EmploymentType {
    name: string;
    id: number;
}

export interface EmploymentTypeModifier {
    name: string;
    id: number;
}

export interface Status {
    name: string;
    id: number;
}

export interface ApplyType {
    name: string;
    id: number;
}

export interface IngestionMethod {
    name: string;
    id: number;
}

export interface LocalizedMonsterUrl {
    locationId: string;
    url: string;
}

export interface Enrichments {
    language: Language;
    mescos: Mesco[];
    normalizedJobLocations: NormalizedJobLocation[];
    companyKb: CompanyKb;
    normalizedTitles: NormalizedTitle[];
    normalizedSalary: NormalizedSalary;
    employmentTypes: EmploymentType[];
    employmentTypeModifiers: EmploymentTypeModifier[];
    status: Status;
    applyType: ApplyType;
    ingestionMethod: IngestionMethod;
    localizedMonsterUrls: LocalizedMonsterUrl[];
    qualifiedForG4J: boolean;
    isPublicJob: boolean;
    googleSyntheticValidThrough: Date;
}

export interface AttributeValuePair {
    name: string;
    value: string;
}

export interface Eeo {
    gender: boolean;
    ethnicity: boolean;
}

export interface Now {
    jobAdPricingTypeId: number;
    folderId?: number;
    boardId?: number;
    templateId?: number;
    eeo: Eeo;
    trackingUrl: string;
}

export interface FieldTranslation {
    fieldName: string;
    name: string;
    locale: string;
    translation: string;
}

export interface Tracking {
    clickUrl: string;
    impressionUrl: string;
}

export interface JobAd {
    type: string;
    provider: string;
    tracking: Tracking;
}

export interface BrandingExt {
    companyBannerUrl: string;
    companyPhotos: unknown[];
    companyBenefits: unknown[];
}

export interface JobViewPreferences {
    hiringOrganizationConfidential: boolean;
}

export interface IMonsterJob {
    schemaVersion: string;
    jobId: string;
    externalIdentifiers: ExternalIdentifier[];
    status: string;
    jobPosting: JobPosting;
    createdDate: Date;
    provider: Provider;
    apply: Apply;
    ingestionMethod: string;
    enrichments: Enrichments;
    attributeValuePairs: AttributeValuePair[];
    now: Now;
    formattedDate: Date;
    dateRecency: string;
    seoJobId: string;
    fieldTranslations: FieldTranslation[];
    jobAd: JobAd;
    brandingExt: BrandingExt;
    bespokeJob: boolean;
    jobViewPreferences: JobViewPreferences;
}

export interface Radius {
    unit: string;
    value: number;
}

export interface Location {
    address: string;
    country: string;
    radius: Radius;
}

export interface JobQuery {
    query: string;
    locations: Location[];
    disableSpellCheck: boolean;
    excludeJobs: unknown[];
    companyDisplayNames: unknown[];
    queryLanguageCode: string;
}

export interface Placement {
    component: string;
    appName: string;
}

export interface JobAdsRequest {
    placement: Placement;
    position: number[];
}

export interface Radius2 {
    unit: string;
    value: number;
}

export interface Location2 {
    address: string;
    country: string;
    radius: Radius2;
}

export interface JobQuery2 {
    query: string;
    locations: Location2[];
    disableSpellCheck: boolean;
    excludeJobs: unknown[];
    companyDisplayNames: unknown[];
    queryLanguageCode: string;
}

export interface Gctsrequest {
    offset: number;
    pageSize: number;
    jobQuery: JobQuery2;
    orderBy: string;
    debug: boolean;
    overrideOptions: boolean;
    enableDiversification: boolean;
    disableKeywordMatch: boolean;
    enableBroadening: boolean;
    paidJobsOnly: boolean;
    gctsJobCount: number;
}

export interface JobRequest {
    offset: number;
    pageSize: number;
    jobQuery: JobQuery;
    orderBy: string;
    debug: boolean;
    overrideOptions: boolean;
    enableDiversification: boolean;
    disableKeywordMatch: boolean;
    enableBroadening: boolean;
    paidJobsOnly: boolean;
    gctsJobCount: number;
    jobAdsRequest: JobAdsRequest;
    searchId: string;
    includeJobs: unknown[];
    gctsrequest: Gctsrequest;
}

export interface IMonsterJonResponse {
    totalSize: number;
    estimatedTotalSize: number;
    jobResults: IMonsterJob[];
    jobRequest: JobRequest;
    histogramQueryResult: unknown[];
    searchId: string;
    gctsReqId: string;
}
