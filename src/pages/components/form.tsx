import {type NextPage} from 'next'

const Form: NextPage = () => {
    return(
        <form className="w-full max-w-m">
            <div className="flex items-center mb-6">
                {/* <label className="block text-white font-bold text-2xl md:text-right mb-1 pr-2">Link:</label> */}
                <input type={"text"} name="link" placeholder="https://www.google.com/" className="border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
            </div>
            <div className="grid justify-items-center">
                <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                    Submit
                </button>
            </div>
        </form>
    );
}

export default Form;