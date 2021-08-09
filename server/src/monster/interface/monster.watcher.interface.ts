export type IListArg = {
    filter: {
        query: string;
        address: string;
        excludeIds?: string[];
    };
    skip?: number;
    limit?: number;
};
