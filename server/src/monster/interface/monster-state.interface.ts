export interface User {
    userId: string;
    firstName: string;
    lastName: string;
}

export interface PrimaryPhoneNumber {
    id: string;
    phoneTypeId: string;
    phoneType: string;
    phoneNumber: string;
    primary: boolean;
}

export interface ContactInfo {
    userValidated: boolean;
    email: string;
    textMessagesAccepted: boolean;
    monsterJobMatchesMessagesAccepted: boolean;
    primaryPhoneNumber: PrimaryPhoneNumber;
}

export interface Address {
    userValidated: boolean;
    id: string;
    cityPlaceId: string;
    city: string;
    postalCode: string;
    countryCode: string;
    country: string;
    type: string;
}

export interface Location {
    countryCode: string;
    country: string;
}

export interface School {
    name: string;
    location: Location;
}

export interface StudyField {
    name: string;
}

export interface Education {
    userValidated: boolean;
    id: string;
    school: School;
    educationLevel: string;
    educationLevelId: string;
    startYear: number;
    startMonth: number;
    completionYear: number;
    completionMonth: number;
    current: boolean;
    summary: string;
    studyFields: StudyField[];
}

export interface Location2 {
    countryCode: string;
    country: string;
}

export interface Company {
    name: string;
    location: Location2;
}

export interface Experience {
    userValidated: boolean;
    id: string;
    company: Company;
    jobTitle: string;
    summary: string;
    startYear: number;
    startMonth: number;
    current: boolean;
    jobTypeId: string;
    jobType: string;
    endYear?: number;
    endMonth?: number;
}

export interface User2 {
    nickname: string;
    name: string;
    picture: string;
    updated_at: Date;
    email: string;
    email_verified: boolean;
    iss: string;
    sub: string;
    aud: string;
    iat: number;
    exp: number;
}

export interface Data {
    access_token: string;
    refresh_token: string;
    id_token: string;
    scope: string;
    expires_in: number;
    token_type: string;
}

export interface Auth {
    user: User2;
    token: string;
    data: Data;
}

export interface Ethnicity {
    name: string;
    ethnicityId: string;
}

export interface Gender {
    name: string;
    genderId: string;
}

export interface Demographics {
    ethnicity: Ethnicity;
    gender: Gender;
}

export interface Link {
    userValidated: boolean;
    id: string;
    url: string;
    description: string;
}

export interface Skill {
    userValidated: boolean;
    id: string;
    name: string;
    skillLevel: string;
    skillLevelId: string;
}

export interface MinSalary {
    currencyCode: string;
    amount: number;
    salaryBaseUnitId: string;
    salaryBaseUnit: string;
}

export interface Optin {
    optinId: string;
}

export interface Profile {
    profileLanguageTag: string;
}

export interface Language {
    userValidated: boolean;
    id: string;
    name: string;
    languageId: string;
    languageProficiency: string;
    languageProficiencyId: string;
}

export interface Tracking {
    ip: string;
}

export interface Localization {
    languageTag: string;
    pathSegment: string;
}

export interface WillingnessToTravel {
    name: string;
    willingnessToTravelId: string;
}

export interface VisibilityStatus {
    name: string;
    visibilityStatusId: string;
}

export interface Homepage {
    url: string;
    title: string;
    app: string;
}

export interface JobSearch {
    url: string;
    title: string;
    app: string;
}

export interface ProfileApplyConsent {
    url: string;
    title: string;
    app: string;
}

export interface State {
    user: User;
    contactInfo: ContactInfo;
    avatarDocumentId: string;
    address: Address;
    educations: Education[];
    experiences: Experience[];
    auth: Auth;
    workAuthorizations: unknown[];
    demographics: Demographics;
    links: Link[];
    description: string;
    skills: Skill[];
    idealJobLocations: unknown[];
    idealJobTitles: unknown[];
    idealJobEmploymentTypes: unknown[];
    minSalary: MinSalary;
    optins: Optin[];
    profile: Profile;
    languages: Language[];
    tracking: Tracking;
    id: string;
    requestInProgress: boolean;
    localization: Localization;
    willingnessToRelocate: boolean;
    willingnessToTravel: WillingnessToTravel;
    onboarding: unknown;
    visibilityStatus: VisibilityStatus;
    diversityFlag: boolean;
    flowHints: unknown[];
    sourceId: string;
}

export interface IMonsterState {
    tenantId: string;
    state: State;
}
