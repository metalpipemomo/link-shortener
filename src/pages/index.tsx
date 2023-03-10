import { type NextPage } from 'next';
import Head from 'next/head';
import { FormEvent, useRef } from 'react';

import { api } from '~/utils/api';

const Home: NextPage = () => {
    const mutation = api.link.createLink.useMutation({});
    const urlInput = useRef<HTMLInputElement>(null);

    const SubmissionHandler = (e: FormEvent): void => {
        e.preventDefault();
        try {
            mutation.mutate({ longLink: urlInput.current?.value as string });
        } catch {
            console.error('Something went wrong...');
        }
    };

    const CopyHandler = (url: string): void => {
        navigator.clipboard
            .writeText(`${window.location.toString()}${url}`)
            .catch((err: PromiseRejectedResult) => console.log(err.reason));
    };

    return (
        <>
            <Head>
                <title>Link Shortener</title>
                <meta name='description' content='Generated by create-t3-app' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] md:flex-row lg:flex-row'>
                <div className={'flex w-full flex-col py-5'}>
                    <div className={'m-auto md:p-5'}>
                        <h1
                            className={
                                'text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]'
                            }>
                            Link{' '}
                            <span className={'text-[hsl(280,100%,70%)]'}>
                                Shortener
                            </span>
                        </h1>
                        <h2 className={'mb-8 text-center tracking-tight'}>
                            Paste your link below!
                        </h2>
                        <form
                            onSubmit={SubmissionHandler}
                            className={'m-auto flex w-80 flex-col space-y-2'}>
                            <input
                                type={'text'}
                                ref={urlInput}
                                placeholder='https://www.google.com/'
                                className={
                                    'mb-2 rounded border-none p-1 px-2 outline outline-2 outline-transparent transition-all duration-100 ease-in-out focus:outline-purple-500'
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
                        {mutation.isSuccess ? (
                            <p
                                onClick={() =>
                                    CopyHandler(mutation.data.newLink)
                                }
                                className={
                                    'mt-4 text-center text-[hsl(280,100%,70%)]'
                                }>
                                {`${window.location.toString()}${
                                    mutation.data.newLink
                                }`}
                            </p>
                        ) : null}
                    </div>
                </div>
                <div
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
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;
