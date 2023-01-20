import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { restapi } from '../../global';
import { useState, useEffect } from 'react';

const fetchComponents = async (type) => {
  const res = await fetch(`${restapi.apiUrl}/component/${type}`);
  const data = await res.json();
  return data;
}

export default () => {
    const [components, setComponents] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const [cpus, gpus, ram, ssd] = await Promise.all([
                fetchComponents('cpu'),
                fetchComponents('gpu'),
                fetchComponents('ram'),
                fetchComponents('ssd')
            ]);
            setComponents([cpus, gpus, ram, ssd]);
        }
        fetchData();
    }, []);
    return (
        <main>
            <div className="grid grid-cols-4 gap-4">
                {components.map((component) => {
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
        </main>
    );
}
