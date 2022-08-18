import { UserContext } from "../lib/context";
import { useContext } from "react";
import SideNav from "./SideNav";

export default () => {
    const {username} = useContext(UserContext);

    const menuData = [
        {
            label: 'Home',
            to: '/',
        },
        {
            label: 'Modules',
            to: '',
            children: [
                {
                    label: 'News',
                    to: 'admin/news',
                    children: [
                    {
                        label: 'View News',
                        to: 'admin/news',
                        },
                    {
                        label: 'Add News',
                        to: 'admin/news',
                    }
                    ],
                },
                {
                label: 'Posts',
                to: 'admin/posts',
                children: [
                    {
                        label: 'View Posts',
                        to: 'admin/posts',
                    },
                    {
                    label: 'Add Posts',
                    to: 'admin/posts',
                    }
                ],
                },
            ],
        },
        {
            label: 'User Panel',
            to: `/${username}`,
        },
    ]

    return (
        <SideNav data={menuData}/>
    );
}