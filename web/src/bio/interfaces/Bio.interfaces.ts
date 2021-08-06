export interface HistoryTemplate {
    entity: string;
    link?: string;
    state?: string;
    period_start: string;
    period_end?: string;
    region: string;
    todo?: string[];
}

export type IProfile = { descriptions: string[] };

export type IHistory = { period_end: string; todo: string[]; period_start: string; link: string; state: string; region: string; entity: string };

export type ISkill = { Databases: string[]; languages: string[]; Frameworks: string[]; Other: string[] };

export type IEducation = { period_end: string; todo: string[]; period_start: string; region: string; entity: string };

export type ICertificates = { title: string; link: string };

export interface IBioData {
    profile: IProfile;
    history: IHistory[];
    skills: ISkill;
    education: IEducation[];
    certificates?: ICertificates[];
}
