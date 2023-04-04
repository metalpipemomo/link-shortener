import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { signIn, useSession } from 'next-auth/react';
import { api } from '~/utils/api';

const Links: NextPage = () => {
    const { data: sessionData } = useSession();
    const query = api.link.getLinks.useQuery();
    const mutation = api.link.deleteLink.useMutation();

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
            <main
                className={
                    'flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] md:flex-row lg:flex-row'
                }>
                <div className={'flex h-screen w-full flex-col py-5'}>
                    {sessionData ? (
                        <div>
                            <h1>{`${sessionData.user.name}'s links`}</h1>
                            <Link href='/'>Create Link</Link>
                            <div>
                                {query.data ? (
                                    query.data.map(
                                        ({ fullLink, newLink }, key) => {
                                            return (
                                                <div key={key}>
                                                    <p>{fullLink}</p>
                                                    <button
                                                        onClick={() => {
                                                            navigator.clipboard
                                                                .writeText(
                                                                    `https://einv.ca/${newLink}`
                                                                )
                                                                .then(() => {})
                                                                .catch(
                                                                    () => {}
                                                                );
                                                        }}>
                                                        copy
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            mutation.mutate({
                                                                shortLink:
                                                                    newLink,
                                                            });
                                                            query.refetch();
                                                        }}>
                                                        X{' '}
                                                        {/** maybe an svg instead? :pleading_face: */}
                                                    </button>
                                                </div>
                                            );
                                        }
                                    )
                                ) : (
                                    <p>You haven't created any links yet!</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className={'m-auto flex flex-col md:p-5'}>
                            <h1 className={'text-center'}>
                                You must be signed in to access this page!
                            </h1>
                            <button
                                className={
                                    'focus:shadow-outline m-auto mt-6 w-24 rounded bg-purple-500 py-2 px-4 font-bold text-white shadow transition duration-100 ease-in-out hover:bg-purple-400 focus:outline-none'
                                }
                                onClick={() => void signIn()}>
                                Sign-in
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default Links;
