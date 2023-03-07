import { type NextPage } from 'next';

const Form: NextPage = () => {
    return (
        <form className='max-w-m w-full'>
            <div className='mb-6 flex items-center'>
                {/* <label className="block text-white font-bold text-2xl md:text-right mb-1 pr-2">Link:</label> */}
                <input
                    type={'text'}
                    name='link'
                    placeholder='https://www.google.com/'
                    className='text-m block w-full rounded-lg border-gray-300 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'></input>
            </div>
            <div className='grid justify-items-center'>
                <button
                    className='focus:shadow-outline rounded bg-purple-500 py-2 px-4 font-bold text-white shadow hover:bg-purple-400 focus:outline-none'
                    type='button'>
                    Submit
                </button>
            </div>
        </form>
    );
};

export default Form;
