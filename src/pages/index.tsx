import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { LoadingSpinner, Clipboard, Checkmark } from '~/components/Icons';

import { FormEvent, useRef, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { api } from '~/utils/api';

const CopyField: React.FC<CopyFieldProps> = ({ url }) => {
    const [copyCol, setCopyCol] = useState('purple');
    const [copyStyle, setCopyStyle] = useState(
        'bg-purple-500 hover:bg-purple-400'
    );
    const [copyBorder, setCopyBorder] = useState('border-purple-500');

    console.log('hi');

    const CopyHandler = (url: string): void => {
        navigator.clipboard
            .writeText(`${window.location.toString()}${url}`)
            .then(() => {
                setCopyCol('green');
                setCopyStyle('bg-green-500 hover:bg-green-400');
                setCopyBorder('border-green-500');
            })
            .catch((err: PromiseRejectedResult) => {
                console.log(err.reason);
                setCopyCol('red');
                setCopyStyle('bg-red-500 hover:bg-red-400');
                setCopyBorder('border-red-500');
            });
    };

    return (
        <div className='my-5 flex flex-row justify-center'>
            <input
                readOnly
                className={`h-9 rounded-l-lg border-y-2 border-l-2 ${copyBorder} py-1 px-2 outline-none`}
                value={window.location.toString() + url}
            />
            <button
                className={`focus:shadow-outline grid h-9 w-auto rounded-r-lg border-y-2 border-r-2 ${copyBorder} transition-all duration-100 ${copyStyle} py-2 px-4 font-bold text-white shadow transition duration-100 ease-in-out focus:outline-none`}
                onClick={() => {
                    CopyHandler(url);
                }}>
                <Clipboard
                    color={'white'}
                    size={20}
                    className={`col-span-full row-span-full transition-all duration-150 ${
                        copyCol != 'green' ? 'opacity-100' : 'opacity-0'
                    }`}
                />
                <Checkmark
                    color={'white'}
                    size={20}
                    className={`col-span-full row-span-full transition-all duration-150 ${
                        copyCol == 'green' ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            </button>
        </div>
    );
};

const Home: NextPage = () => {
    const { data: sessionData } = useSession();
    const mutation = sessionData
        ? api.link.createLinkProtected.useMutation({})
        : api.link.createLink.useMutation({});
    const urlInput = useRef<HTMLInputElement>(null);

    const SubmissionHandler = (e: FormEvent): void => {
        e.preventDefault();
        try {
            const regexp =
                /https?:\/\/(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
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
                <div className={'flex h-screen w-full flex-col py-5'}>
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
                            <b className='text-purple-500'>Paste</b>
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
                    {sessionData ? (
                        <div className={'flex flex-col text-center'}>
                            <p>
                                <i>Welcome back, {sessionData.user.name}!</i>
                            </p>
                            <Link
                                className={'text-[hsl(280,100%,70%)]'}
                                href={'/links'}>
                                <u>Manage Links</u>
                            </Link>
                        </div>
                    ) : (
                        <div className={'flex flex-col text-center'}>
                            <p>Want to manage your links?</p>
                            <button
                                className={'text-[hsl(280,100%,70%)]'}
                                onClick={() => void signIn()}>
                                Click here to sign in!
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default Home;
