import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

import { prisma } from '~/server/db';
import Head from 'next/head';

const RedirectPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>short</title>
                <meta name={'description'} content={'link shortener'} />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <body>
                <div>
                    <p>redirecting...</p>
                </div>
            </body>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (
    ctx: GetServerSidePropsContext
) => {
    const { link } = ctx.params!;
    const longLink =
        (await prisma.link.findUnique({
            where: { newLink: link as string },
            select: { fullLink: true },
        })) ?? null;

    if (longLink) {
        return {
            redirect: {
                destination: longLink?.fullLink,
                permanent: false,
            },
        };
    } else {
        return { props: {} };
    }
};

export default RedirectPage;
