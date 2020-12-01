import React from 'react';
import { data } from './constants/Bio.constants';
import { StringUtils } from '../utils/string/string.utils';
import { HistoryTemplate } from './interfaces/Bio.interfaces';

export class Bio extends React.Component<any, any> {
    protected static get profile() {
        return data?.profile?.descriptions?.map((el, index) => {
            let formatEl = el;
            Bio.links.map((entity) => {
                if (formatEl.includes(entity)) {
                    formatEl = formatEl.replaceAll(entity, `<a class="text-firm" href="#${entity}">${entity}</a>`);
                }
                return null;
            });
            return <p key={index} dangerouslySetInnerHTML={{ __html: formatEl }}></p>;
        });
    }

    protected static get history() {
        return Bio.printHistoryTemplate(data?.history);
    }

    protected static get links() {
        return data?.history?.map(({ entity }) => entity) || [];
    }

    protected static get skills() {
        const skills = (data?.skills as { [key: string]: string[] }) || {};
        return (Object.keys(skills) || []).map((key) => {
            return (
                <div className="lg:py-2 lg:ml-2">
                    <p className="mb-1">{StringUtils.firstUpper(key)}</p>
                    <ul>
                        {(skills[key] || []).map((value, index) => {
                            return (
                                <li className="list-disc ml-3" key={index}>
                                    {value}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        });
    }

    protected static get education() {
        return Bio.printHistoryTemplate(data?.education);
    }

    protected static printHistoryTemplate(params?: HistoryTemplate[]) {
        return (params || []).map((el) => {
            return (
                <div className="py-2 pl-5" key={el.entity} id={el.entity}>
                    <p className="font-medium">
                        {StringUtils.firstUpper(el.state ? el.state.concat(', ') : '')}{' '}
                        {el.link ? (
                            <a className="text-firm" href={el.link || '#'}>
                                {el.entity}
                            </a>
                        ) : (
                            <span>{el.entity}</span>
                        )}
                    </p>
                    <p className="text-gray-600 my-1">
                        {el.period_start} — {el.period_end || 'Present'} | {el.region}
                    </p>
                    <ul className="ml-5">
                        {el.todo?.map((td, index) => {
                            return (
                                <li className="list-disc" key={index}>
                                    {td}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <div className="container my-4 grid grid-cols-1 lg:grid-cols-5">
                    <div className="body col-span-1 lg:col-span-4">
                        <div className="who_am_i grid sm:grid-cols-3 md:grid-cols-5 justify-items-center sm:justify-items-start">
                            <img
                                className="mb-2 w-8/12 sm:w-2/3 rounded"
                                src={process.env.REACT_APP_SELF_PHOTO}
                                alt={(process.env.REACT_APP_SELF_FULLNAME || '').concat(' ', 'portfolio.')}
                            />
                            <div className="sm:col-span-2 md:col-span-4 flex flex-col justify-center">
                                <h1 className="text-firm text-2xl font-bold">{process.env.REACT_APP_SELF_FULLNAME}</h1>
                                <p className="text-xl font-medium">Back-end engineer</p>
                                <p className="font-medium text-sm">
                                    contact me:{' '}
                                    <a className="text-firm font-bold" href={'mailto:'.concat(process.env.REACT_APP_SELF_MAIL || '')}>
                                        {process.env.REACT_APP_SELF_MAIL || ''}
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div className="profile py-5">
                            <p className="uppercase mb-2">profile</p>
                            <div className="text-sm">{Bio.profile}</div>
                        </div>

                        <div className="history py-5">
                            <p className="uppercase mb-2">EMPLOYMENT HISTORY</p>
                            <div className="text-sm">{Bio.history}</div>
                        </div>

                        <div className="education py-5">
                            <p className="uppercase mb-2">education</p>
                            <div className="text-sm">{Bio.education}</div>
                        </div>
                    </div>

                    <div className="info-bar grid grid-cols-2 lg:grid-cols-1 auto-rows-max">
                        <div className="group">
                            <p className="uppercase mb-1">DETAILS</p>
                            <a className="text-firm" href={'callto:'.concat(process.env.REACT_APP_SELF_PHONE || '')}>
                                {process.env.REACT_APP_SELF_PHONE || ''}
                            </a>
                        </div>
                        <div className="group lg:py-2">
                            <p className="uppercase mb-1">LINKS</p>
                            <a className="text-firm" href="https://www.linkedin.com/in/adel-khalitov/">
                                Linkedin
                            </a>
                        </div>
                        <div className="group py-2 col-span-2 lg:col-span-1">
                            <p className="uppercase mb-1">SKILLS</p>
                            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-1">{Bio.skills}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
