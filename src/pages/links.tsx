import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {
    Checkmark,
    Clipboard,
    LoadingSpinner,
    XMark,
} from '~/components/Icons';
import { signIn, useSession } from 'next-auth/react';
import { api } from '~/utils/api';
import { useState } from 'react';

const LinkDisplay: React.FC<LinkDisplayProps> = ({
    fullLink,
    newLink,
    key,
    copyLink,
    deleteLink,
}) => {
    const [deleteIcon, setDeleteIcon] = useState(
        <XMark className='' size={20} color={'white'} />
    );
    const [clipboardStyle, setClipboardStyle] = useState(
        'border-purple-500 bg-purple-500 hover:border-purple-400 hover:bg-purple-400'
    );
    const [clipboardIcon, setClipboardIcon] = useState(
        <Clipboard size={20} color={'white'} />
    );

    return (
        <div className='my-3 mx-auto flex' key={key}>
            <button
                className='h-9 rounded-l-lg border-2 border-red-500 bg-red-500 p-1 transition-all duration-150 hover:border-red-400 hover:bg-red-400'
                onClick={() => {
                    deleteLink(newLink);
                    setDeleteIcon(<LoadingSpinner size={20} color={'white'} />);
                }}>
                {deleteIcon}
            </button>

            <input
                readOnly
                className={`h-9 border-y-2 border-purple-500 py-1 px-2 outline-none`}
                value={fullLink}
            />

            <button
                className={`h-9 rounded-r-lg border-2 p-1 transition-all duration-150 ${clipboardStyle}`}
                title={`Copy https://einv.ca/${newLink} to clipboard`}
                onClick={() => {
                    copyLink(newLink, setClipboardStyle, setClipboardIcon);
                }}>
                {clipboardIcon}
            </button>
        </div>
    );
};

const Links: NextPage = () => {
    const { data: sessionData } = useSession();
    const query = api.link.getLinks.useQuery();
    const mutation = api.link.deleteLink.useMutation();

    const copyLink = (
        newLink: string,
        setStyle: (style: string) => void,
        setIcon: (icon: JSX.Element) => void
    ) => {
        navigator.clipboard
            .writeText(`https://einv.ca/${newLink}`)
            .then(() => {
                setStyle(
                    'border-green-500 bg-green-500 hover:border-green-400 hover:bg-green-400'
                );
                setIcon(<Checkmark size={20} color={'white'} />);
            })
            .catch(() => {
                setStyle(
                    'border-red-500 bg-red-500 hover:border-red-400 hover:bg-red-400'
                );
            });
    };
    const deleteLink = (newLink: string) => {
        mutation.mutate({
            shortLink: newLink,
        });
        query.refetch();
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
            <main
                className={
                    'flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] md:flex-row lg:flex-row'
                }>
                <div className={'flex h-screen w-full flex-col py-5'}>
                    {sessionData ? (
                        <div className='m-auto flex flex-col md:p-5'>
                            <h1 className='font-center text-center text-3xl font-bold'>{`${sessionData.user.name}'s Links`}</h1>
                            <Link
                                href='/'
                                className='text-center text-[hsl(280,100%,70%)] underline'>
                                Create Link
                            </Link>
                            <div className='mx-auto'>
                                {query.data ? (
                                    query.data.map(({ fullLink, newLink }) => {
                                        return (
                                            <LinkDisplay
                                                fullLink={fullLink}
                                                newLink={newLink}
                                                key={newLink}
                                                copyLink={copyLink}
                                                deleteLink={deleteLink}
                                            />
                                        );
                                    })
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
                                    'focus:shadow-outline m-auto mt-6 w-24 rounded bg-purple-500 py-2 px-4 font-bold text-[hsl(280,100%,70%)] shadow transition duration-100 ease-in-out hover:bg-purple-400 focus:outline-none'
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
