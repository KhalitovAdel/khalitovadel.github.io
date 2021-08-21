import { getQueueToken } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { Job, JobStatusClean, Queue } from 'bull';

import { BullQueueEnum } from '../../../enum/bull-queue.enum';
import { ErrorDefault } from '../../../error';
import { IMonsterTask } from '../../interface/monster-task.interface';
import { MonsterModule } from '../../monster.module';
import { MonsterApi } from '../monster.api';
import { MonsterUpdater } from '../monster.updater';

class MockService {
    static handlerTask = (job: Job<IMonsterTask>) => {
        // eslint-disable-next-line no-console
        console.log(job);
    };

    static handlerResult = (job: Job<IMonsterTask>, result: unknown) => {
        // eslint-disable-next-line no-console
        console.log(job, result);
    };

    static handlerError = (job: Job<IMonsterTask>, error: ErrorDefault) => {
        // eslint-disable-next-line no-console
        console.log(job, error);
    };
}

// TODO Write all tests for consumer, add clear queue to before all
describe('MonsterConsumer', () => {
    let processor: Queue;
    const mockJobId = '123';

    jest.setTimeout(1000 * 60 * 2);
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [MonsterModule],
        })
            .overrideProvider(MonsterApi)
            .useValue({
                handleJob: (job: Job<IMonsterTask>) => MockService.handlerTask(job),
            })
            .overrideProvider(MonsterUpdater)
            .useValue({
                handleError: (job: Job<IMonsterTask>, error: ErrorDefault) => MockService.handlerError(job, error),
                handleResult: (job: Job<IMonsterTask>, result: unknown) => MockService.handlerResult(job, result),
            })
            .compile();

        await module.init();
        processor = module.get<Queue>(getQueueToken(BullQueueEnum.MONSTER));
    });

    beforeEach(async () => {
        const statuses: JobStatusClean[] = ['completed', 'wait', 'active', 'delayed', 'failed', 'paused'];
        await Promise.all(statuses.map((status) => processor.clean(0, status)));
    });

    it('should handleJob works', (done) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        MockService.handlerTask = (jobId: string) => {
            try {
                expect(jobId).toEqual(mockJobId);
                done();
            } catch (e) {
                done.fail(e);
            }
        };

        const job: IMonsterTask = {
            jobId: mockJobId,
        };

        processor.add(job);
    });

    it('should handlerResult works', (done) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        MockService.handlerTask = (jobId: string) => {
            return jobId;
        };

        MockService.handlerResult = (job: Job<IMonsterTask>, result: unknown) => {
            try {
                expect(job.data.jobId).toEqual(mockJobId);
                expect(result).toEqual(mockJobId);
                done();
            } catch (e) {
                done(e);
            }
        };

        const job: IMonsterTask = {
            jobId: mockJobId,
        };

        processor.add(job);
    });

    it('should handlerResult works', (done) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        MockService.handlerTask = () => {
            throw new ErrorDefault();
        };

        MockService.handlerError = (job: Job<IMonsterTask>, error: ErrorDefault) => {
            try {
                expect(job.data.jobId).toEqual(mockJobId);
                expect(error).toBeInstanceOf(ErrorDefault);
                done();
            } catch (e) {
                done(e);
            }
        };

        const job: IMonsterTask = {
            jobId: mockJobId,
        };

        processor.add(job);
    });
});
