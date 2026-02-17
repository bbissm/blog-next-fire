import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { restapi } from '../../global';
import { useState, useEffect } from 'react';

const fetchComponents = async (type) => {
  const res = await fetch(`${restapi.apiUrl}/component/${type}`);
  const data = await res.json();
  return data;
}

const paginateData = (data, page, limit) => {
    const startIndex = (page - 1) * limit;
    return data.slice(startIndex, startIndex + limit);
}

export default () => {
    const [components, setComponents] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const limit = 10;
    const [totalPages, setTotalPages] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const [cpus, gpus, ram, ssd] = await Promise.all([
                fetchComponents('cpu'),
                fetchComponents('gpu'),
                fetchComponents('ram'),
                fetchComponents('ssd')
            ]);
            const totalItems = cpus.length + gpus.length + ram.length + ssd.length;
            setTotalPages(Math.ceil(totalItems / limit));
            const paginatedCpus = paginateData(cpus, page, limit);
            const paginatedGpus = paginateData(gpus, page, limit);
            const paginatedRam = paginateData(ram, page, limit);
            const paginatedSsd = paginateData(ssd, page, limit);
            setComponents([paginatedCpus, paginatedGpus, paginatedRam, paginatedSsd]);
        }
        fetchData();
    }, [page]);    

    const handlePageChange = (newPage) => {
        setPage(newPage);
    }

    return (
        <main>
            <div className="grid grid-cols-4 gap-4">
                {components.map((component, index) => {
                    const sortedComponents = [...component].sort((a, b) => b.Benchmark - a.Benchmark);
                    return(
                        <ul>
                            <h2 className='font-weight-700'>{sortedComponents[0].Type}</h2>
                            {sortedComponents.map((item) => {
                                return(
                                    <li key={item.id} className="flex place-items-center">
                                        <FontAwesomeIcon icon="fa-microchip" />
                                        <Link href={item.URL} className="gap-12 hover:dark:bg-gray-300 rounded p-3" >
                                            {item.Model} - {item.Benchmark}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    )
                })}
            </div>
            <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 overflow-auto	">
                <div class="flex flex-1 justify-between sm:hidden">
                    <a href="#" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                    <a href="#" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
                </div>
                <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p class="text-sm text-gray-700">
                            Showing
                            <span class="font-medium">1</span>
                            to
                            <span class="font-medium">10</span>
                            of
                            <span class="font-medium">97</span>
                            results
                        </p>
                    </div>
                    <div>
                        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <Link href="#" class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                                <span class="sr-only">Previous</span>
                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                                </svg>
                            </Link>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button key={index} onClick={() => handlePageChange(index + 1)} className={`${page === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'} relative z-10 inline-flex items-center border border-indigo-500 px-4 py-2 text-sm font-medium focus:z-20 m-0`}>
                                    <a href="#" aria-current="page" class="">{index + 1}</a>
                                </button>
                            ))}
                            <Link href="#" class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                                <span class="sr-only">Next</span>
                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                </svg>
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </main>
    );    
}