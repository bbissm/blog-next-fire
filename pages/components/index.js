import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';


export async function getStaticProps() {
    const resCpu = await fetch('http://restapi.loc:88/component/cpu')  // your fetch function here 
    const cpus = await resCpu.json()

    const resGpu = await fetch('http://restapi.loc:88/component/gpu')  // your fetch function here 
    const gpus = await resGpu.json()

    const resRam = await fetch('http://restapi.loc:88/component/ram')  // your fetch function here 
    const ram = await resRam.json()

    const resSsd = await fetch('http://restapi.loc:88/component/ssd')  // your fetch function here 
    const ssd = await resSsd.json()
    const components = [cpus,gpus,ram,ssd]
    return {
        props: {components}
    };
}




export default (props) => {

    const {components} = props;
    return (
        <main>
            <div className="grid grid-cols-4 gap-4">
                {components.map((component) => {
                    const rankAscending = [...component].sort((a, b) => b.Benchmark - a.Benchmark);
                    return(
                        <ul>
                            <h2 className='font-weight-700'>{rankAscending[0].Type}</h2>
                            {component.map((item,index) => {
                                return(
                                    <li key={index} className="flex place-items-center">
                                        <FontAwesomeIcon icon="fa-microchip" />
                                        <Link href={item.URL}>
                                            <a className="gap-12 hover:dark:bg-gray-300 rounded p-3" target={"_blank"}>{item.Model} - {item.Benchmark}</a>
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



/*export default (props) => {
    const {cpus} = props;
    const rankAscending = [...cpus].sort((a, b) => b.Benchmark - a.Benchmark);
    return (
        <main>
           <div className="grid grid-cols-4 gap-4">
                <ul>
                    <h2 className='font-weight-700'>{rankAscending[0].Type}</h2>
                        {rankAscending.map((component, index) => {
                            
                        return(
                            <li key={index} className="flex place-items-center">
                                <FontAwesomeIcon icon="fa-microchip" />
                                <Link href={component.URL}>
                                    <a className="gap-12 hover:dark:bg-gray-300 rounded p-3">{component.Model} - {component.Benchmark}</a>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </main>
    );
}*/