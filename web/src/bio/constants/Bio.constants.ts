import { IBioData } from '../interfaces/Bio.interfaces';

export const data: IBioData = {
    profile: {
        descriptions: [
            `Javascript Developer and talented Software Engineer with expertise in ` +
                `object-oriented analysis and design and exceptional record overseeing ` +
                `all facets of Software Development Life Cycle, from analysis and design ` +
                `to implementation and maintenance also migration.`,
            `My objective is to apply my technical skills in IT craftsmanship and IT ` +
                `implementation, and to utilize my knowledge in web configuration and ` +
                `troubleshooting to fulfill the company’s vision and mission. I aim to bring ` +
                `success to the company by designing specific IT solutions.`,
            'I am open to learning and quickly grasp new information.',
            'I am a team player, open to adapt changes and a great problem solver.',
            'With this said, I can assure that I can be a useful talent of the company.',
        ],
    },
    history: [
        {
            entity: '@largest_russian_corporation',
            link: '',
            state: 'full-stack engineer',
            period_start: '2022/10',
            period_end: '',
            region: 'RF, Moscow',
            todo: [
                'API: OData, RestApi, Kafka',
                'Mobile development: Capacitor',
                'Mentoring for new employees',
                'Arranging & chairing weekly team meetings',
                'Involved in the recruitment of new staff',
                'Working with solution architects and other developers to design, develop, test and deploy applications and services',
                'Working in agile team',
                'Detailing and planning the current backlog',
                'Close cooperation with designers, business analyst and customer',
                'Back-end: Java, nodejs',
                'Frontend: React',
            ],
        },
        {
            entity: '@pinpointer',
            link: 'https://www.pinpointer.se',
            state: 'javascript engineer',
            period_start: '2021/2',
            period_end: '2022/10',
            region: 'Sweden (remotely)',
            todo: [
                'Stack: MERN',
                'API: GQL, RestApi, RMQ',
                'Mobile development: Capacitor',
                'Mentoring for new employees',
                'Arranging & chairing weekly team meetings',
                'Involved in the recruitment of new staff',
                'Working with solution architects and other developers to design, develop, test and deploy applications and services',
                'Working in agile/scrum team',
                'Detailing and planning the current backlog',
                'Close cooperation with designers, business analyst and customer',
            ],
        },
        {
            entity: '@alternativa',
            link: 'https://agenta.online/',
            state: 'javascript engineer',
            period_start: '2020',
            period_end: '2021/2',
            region: 'RF, Kazan',
            todo: [
                'Stack: MERN + postgres',
                'API: RestApi, RMQ',
                'Optimization application to fast development for the integrations with insurance company',
                '10+ integrations per year',
                'Setup test/development environment',
                'Creating WEBGL Graphs',
                "Integration with power bi and customer's accounting system",
            ],
        },
        {
            entity: '@redtaxi',
            link: 'https://www.linkedin.com/company/redtaxilb/about/',
            state: 'javascript engineer',
            period_start: '2020',
            period_end: '2020/3',
            region: 'Lebanon (remotely)',
            todo: ['Stack: postgres + express', 'API: RestApi', 'Integration application with payment system', 'Setup test/development environment'],
        },
        {
            entity: '@mobishop',
            link: 'https://www.linkedin.com/company/mobishop/about/',
            state: 'javascript engineer',
            period_start: '2019',
            period_end: '2020',
            region: 'RF, Moscow',
            todo: [
                'Stack: MEAN',
                'API: RestApi',
                'Mentoring for new employees',
                "Creating of endpoints adapted for the customer's systems for the current API",
                'Optimization shop performance',
                'Optimization database performance',
            ],
        },
        {
            entity: '@cleanup',
            link: 'https://cleanup.one',
            state: 'javascript engineer',
            period_start: '2018',
            period_end: '2019',
            region: 'RF, Kazan',
            todo: ['Stack: bootstrap + express', 'API: RestApi', 'Development application for customer needs', 'Close cooperation with the marketing department'],
        },
        {
            entity: '@freelance',
            link: '',
            state: 'javascript engineer',
            period_start: '2016',
            period_end: '2018',
            region: 'RF, Kazan',
            todo: ['Creating of a CRM system', 'Scraping of information from the web sites', 'Creating of a plain web sites', 'Creating reports from the database'],
        },
        {
            entity: '@ЦСП',
            link: 'https://цсп-рт.рф',
            state: 'system administrator',
            period_start: '2013',
            period_end: '2015',
            region: 'RF, Kazan',
            todo: [
                'Creating a news site in several languages',
                'Maintenance of the video surveillance portal for sports facilities of the republic',
                'Maintenance of 150 corporate computers',
                'Maintenance of 5 physical servers',
            ],
        },
    ],
    skills: {
        languages: ['TypeScript', 'Python', 'JAVA'],
        Databases: ['Mongodb', 'MySQL', 'Postgres'],
        'Web Frameworks': ['Angular', 'Vue', 'React', 'Capacitor'],
        'Backend Frameworks': ['Express', 'Nestjs'],
        'Testing tools': ['Jest', 'Puppeteer'],
        Communication: ['RabbitMQ', 'RestApi', 'Web Socket', 'GraphQL'],
        Other: ['Linux', 'Docker', 'Gitlab CI', 'Bitbucket CI', 'Elasticsearch (ELK)', 'Web scraping', 'Flow', 'Eslint'],
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
        {
            title: 'Enterprise Patterns',
            link: 'https://www.icloud.com/iclouddrive/005qATrj3omHA15DKIUibB-zw#ep',
        },
    ],
};
