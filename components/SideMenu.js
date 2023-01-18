import { useEffect, useState } from "react";
import SideNav from "./SideNav";

export default function SideMenu({props, username}) {
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
        const response = await fetch('http://restapi.loc:88/articles');
        const data = await response.json();
        setData(data);
        } catch (error) {
            setData(null);
            console.error('Fetch failed. Please run the api server.');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    let menuData = [
        {
            label: 'Home',
            to: '/',
        },
        {
            label: 'Posts',
            to: '/admin/posts',
            children: [
                {
                label: 'Add Posts',
                to: 'add',
                },
                {
                    label: 'View Posts',
                    to: '',
                },
            ],
        },
        {
            label: 'News',
            to: '/admin/news',
            children: [
                {
                    label: 'Add News',
                    to: 'add',
                },
                {
                    label: 'View News',
                    to: '',
                }
            ]
        },
        {
            label: 'Articles',
            to: '/admin/articles',
            children: [
                {
                    label: 'Add Article',
                    to: 'add',
                },
                {
                    label: 'View Articles',
                    to: '',
                }
            ]
        },
        {
            label: 'User Panel',
            to: `/${username}`,
        },
    ]
    if (data === null) {
        menuData = menuData.filter(item => item.label !== 'Articles');
    }
    return (
        <SideNav data={menuData}/>
    );
}