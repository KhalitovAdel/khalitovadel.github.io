import { IBioData } from '../interfaces/Bio.interfaces';

export const data: IBioData = {
    profile: {
        descriptions: [
            `Programming in <b>${'typescript/javascript'.toUpperCase()}</b> all the time I tried to find a balance of readable code, fast development, flexible change.`,
            `In my free time I develop in <b>${'JAVA/Python'.toUpperCase()}</b>. I've always compared development approaches.`,
            "After some time, I came to the conclusion that it doesn't matter which programming language to choose, because if you follow programming standards, you always get flexible code.",
            `<b>${'Architecture issues'.toUpperCase()}</b> are very important to me.`,
            `In projects where I work, I always set myself the task of effectively dealing with <b>${'complex code'.toUpperCase()}</b>.`,
        ],
    },
    history: [
        {
            entity: '@pinpointer',
            link: 'https://www.pinpointer.se',
            state: 'full stack engineer',
            period_start: '2021/2',
            period_end: '',
            region: 'Sweden (remotely)',
            todo: ['Integrations with scrive system.', 'Implementation microservices', 'Mobile development (ionic, capacitor)'],
        },
        {
            entity: '@alternativa',
            link: 'https://agenta.online/',
            state: 'back-end engineer',
            period_start: '2020',
            period_end: '2021/2',
            region: 'RF, Kazan',
            todo: [
                'Integrations with insurance companies.',
                'Practice nestjs, rmq, kubernetes, elasticsearch.',
                'Integrations with accounting system.',
                'Containerization (bitbucket).',
            ],
        },
        {
            entity: '@redtaxi',
            link: 'https://www.linkedin.com/company/redtaxilb/about/',
            state: 'back-end engineer',
            period_start: '2020',
            period_end: '2020/3',
            region: 'Lebanon (remotely)',
            todo: ['Connection of a payment gateway.', 'Project deployment in development environments.', 'Containerization (gitlab-ci).'],
        },
        {
            entity: '@mobishop',
            link: 'https://www.linkedin.com/company/mobishop/about/',
            state: 'back-end engineer',
            period_start: '2019',
            period_end: '2020',
            region: 'RF, Moscow',
            todo: [
                'Writing a client-friendly API.',
                'Worked in collaboration with other team members to achieve success.',
                'Always good faith and positive attitude.',
                'Consulting a client by API.',
                'Integration of distributor data in the online store.',
            ],
        },
        {
            entity: '@own_projects',
            link: '',
            state: 'back-end engineer',
            period_start: '2017',
            period_end: '2019',
            region: 'RF, Kazan',
            todo: [
                'Creation of a CRM system. Learning node js, typescript. Practice (GIT).',
                'The project is a cleaning company, created on the example of qlean.ru.',
                'Angular | React | Node js',
            ],
        },
    ],
    skills: {
        languages: ['TypeScript', 'Python', 'JAVA'],
        Databases: ['Mongodb', 'MySQL', 'Postgres'],
        Frameworks: ['Angular', 'Vue', 'Express', 'Nestjs', 'React'],
        Other: ['Linux', 'Docker', 'Gitlab CI', 'Bitbucket CI', 'Elasticsearch (ELK)', 'RabbitMQ', 'Web scraping', 'Socket', 'GraphQL', 'Flow', 'Capacitor'],
    },
    education: [
        {
            entity: 'Kazan (Volga) Federal University, Hight school',
            period_start: '2012',
            period_end: '2018',
            region: 'RF, Kazan',
            todo: ['2 years of study. Applied Informatics. Studied JAVA.', 'After 2 years of study, I transferred to the law faculty.'],
        },
    ],
    certificates: [
        {
            title: 'Cambly',
            link: 'http://www.cambly.com/en/certificate/verify/ca9527ad',
        },
        {
            title: 'GOF & GRASP',
            link: 'https://www.icloud.com/iclouddrive/0KU6Ub8JDVOESk3dyNXskmXfg#gof_grasp',
        },
    ],
};
