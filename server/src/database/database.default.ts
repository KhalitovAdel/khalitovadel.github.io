import { EntityManager, FindManyOptions, FindOneOptions } from 'typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

export type IClass<T = never> = new (...args: T[]) => T;

export class DatabaseDefault<CREATE, UPDATE, ENTITY extends CREATE | UPDATE> {
    constructor(protected readonly entity: IClass<ENTITY>, protected readonly entityManager: EntityManager, protected readonly idKey: keyof ENTITY) {}

    public transformQuery<T = never>(query: number | FindOneOptions<T>): FindOneOptions<T> {
        return typeof query === 'number' ? { where: { [this.idKey]: query } } : query;
    }

    create(params: CREATE): Promise<ENTITY> {
        return this.entityManager.save(this.entity, params);
    }

    createMany(params: CREATE[]): Promise<ENTITY[]> {
        return this.entityManager.save(this.entity, params);
    }

    async updateOne(query: number | FindOneOptions<ENTITY>, toUpdate: UPDATE): Promise<ENTITY> {
        return this.updateMany({ take: 1, ...this.transformQuery<ENTITY>(query) }, toUpdate).then((data) => data[0]);
    }

    async updateMany(query: FindManyOptions<ENTITY>, toUpdate: UPDATE): Promise<Array<ENTITY & UPDATE>> {
        const exists = await this.entityManager.find(this.entity, query);
        if (!exists) return [];

        return this.entityManager.save(
            this.entity,
            exists.map((curr) => ({ ...curr, ...toUpdate }))
        );
    }

    async delete(id: number): Promise<DeleteResult> {
        return this.entityManager.delete(this.entity, id);
    }

    async fetchOne(query: number | FindOneOptions<ENTITY>): Promise<ENTITY | undefined> {
        if (!query) return;

        return this.list({ take: 1, ...this.transformQuery(query) }).then(({ data }) => data[0]);
    }

    async list(options?: FindManyOptions<ENTITY>): Promise<{ count: number; data: ENTITY[] }> {
        const [document, count] = await this.entityManager.findAndCount(this.entity, options);

        return {
            data: document || [],
            count: count || 0,
        };
    }

    async count(query?: FindManyOptions<ENTITY> | number): Promise<number> {
        const transformedQuery = this.transformQuery(query ?? {});

        return this.entityManager.count(this.entity, transformedQuery);
    }
}
