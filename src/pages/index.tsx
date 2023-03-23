import { type NextPage } from 'next';
import Head from 'next/head';
import { FormEvent, useRef, useState } from 'react';
import { api } from '~/utils/api';

import AuthButton from '../components/AuthButton';
import { LoadingSpinner, Clipboard } from '../components/Icons';

const CopyField: React.FC<CopyFieldProps> = ({ url }) => {
    const [copyCol, setCopyCol] = useState('bg-purple-500 hover:bg-purple-400');

    const CopyHandler = (url: string): void => {
        navigator.clipboard
            .writeText(`${window.location.toString()}${url}`)
            .then(() => setCopyCol('bg-green-500 hover:bg-green-400'))
            .catch((err: PromiseRejectedResult) => {
                console.log(err.reason);
                setCopyCol('bg-red-500 hover:bg-red-400');
            });
    };

    return (
        <div className='my-5 flex flex-row justify-center'>
            <input
                readOnly
                className={'h-9 rounded-l-lg py-1 px-2 outline-none'}
                value={window.location.toString() + url}
            />
            <button
                className={`focus:shadow-outline h-9 w-auto rounded-r-lg transition-all duration-100 ${copyCol} py-2 px-4 font-bold text-white shadow transition duration-100 ease-in-out focus:outline-none`}
                onClick={() => {
                    CopyHandler(url);
                }}>
                <Clipboard color={'white'} size={20} />
            </button>
        </div>
    );
};

const Home: NextPage = () => {
    const mutation = api.link.createLink.useMutation({});
    const urlInput = useRef<HTMLInputElement>(null);

    const SubmissionHandler = (e: FormEvent): void => {
        e.preventDefault();
        try {
            const regexp = new RegExp(
                'https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)'
            );
            if (urlInput.current && !regexp.test(urlInput.current.value))
                throw new Error('bad regex :(');

            mutation.mutate({ longLink: urlInput.current?.value as string });
        } catch {
            console.error('Something went wrong...');
        }
    };

    return (
        <>
            <Head>
                <title>E-Invite</title>
                <meta
                    name='description'
                    content='A tool for shortening links.'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] md:flex-row lg:flex-row'>
                <div className={'flex w-full flex-col py-5'}>
                    <div className={'m-auto md:p-5'}>
                        <h1
                            className={
                                'select-none text-center text-[5rem] font-extrabold leading-none tracking-tight'
                            }>
                            E{`-`}
                            <span className={'text-[hsl(280,100%,70%)]'}>
                                Invite
                            </span>
                        </h1>
                        <h2
                            className={
                                'mx-auto mb-6 mt-1 max-w-[18rem] select-none text-center tracking-tight'
                            }>
                            <i>{`Say goodbye to lengthy invite links and shorten your URLs in a *snap*!`}</i>
                        </h2>
                        <p className='mb-3 select-none text-center tracking-tight'>
                            <span className='text-purple-500'>Paste</span>
                            {` your link below to start!`}
                        </p>
                        {mutation.isLoading ? (
                            <LoadingSpinner
                                size={36}
                                color={'white'}
                                className={'mx-auto my-4'}
                            />
                        ) : (
                            <form
                                onSubmit={SubmissionHandler}
                                className={
                                    'm-auto flex w-80 flex-col space-y-2'
                                }>
                                <input
                                    type={'text'}
                                    ref={urlInput}
                                    placeholder='https://www.google.com/'
                                    pattern='https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)'
                                    required
                                    className={
                                        'mb-2 rounded border-none p-1 px-2 outline outline-0 outline-transparent transition-all duration-100 ease-in-out focus:outline-2 focus:outline-purple-500'
                                    }
                                />
                                <button
                                    className={
                                        'focus:shadow-outline m-auto w-24 rounded bg-purple-500 py-2 px-4 font-bold text-white shadow transition duration-100 ease-in-out hover:bg-purple-400 focus:outline-none'
                                    }
                                    type={'submit'}>
                                    Submit
                                </button>
                            </form>
                        )}

                        {mutation.isSuccess ? (
                            <CopyField url={mutation.data.newLink} />
                        ) : mutation.isError ? (
                            <p
                                className={
                                    'mt-4 text-center text-[hsl(280,100%,70%)]'
                                }>
                                Failed to create link.
                            </p>
                        ) : null}
                    </div>
                </div>
                {/* <hr
                    className={
                        'm-5 h-0.5 w-96 bg-white opacity-40 md:m-auto md:h-96 md:w-1'
                    }
                />
                <div className={'flex w-full flex-col space-y-4 py-5'}>
                    <div className={'m-auto max-w-sm space-y-4 md:p-5'}>
                        <p className={'overflow-ellipsis'}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Proin vitae ipsum auctor, varius nibh
                            efficitur, mollis nibh. Proin ac metus dapibus,
                            mattis ligula nec, feugiat urna. Nam vulputate
                            bibendum arcu at ornare. Aliquam ut mauris eget
                            tellus molestie suscipit. Ut quis dolor sit amet
                            velit imperdiet iaculis. Nulla cursus ornare
                            porttitor. Mauris ultrices nulla quis dui fermentum,
                            quis sollicitudin ante aliquam.
                        </p>
                        <p className={'overflow-ellipsis'}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Proin vitae ipsum auctor, varius nibh
                            efficitur, mollis nibh. Proin ac metus dapibus,
                            mattis ligula nec, feugiat urna. Nam vulputate
                            bibendum arcu at ornare. Aliquam ut mauris eget
                            tellus molestie suscipit. Ut quis dolor sit amet
                            velit imperdiet iaculis. Nulla cursus ornare
                            porttitor. Mauris ultrices nulla quis dui fermentum,
                            quis sollicitudin ante aliquam.
                        </p>
                        <AuthButton />
                    </div>
                </div> */}
            </main>
        </>
    );
};

export default Home;
