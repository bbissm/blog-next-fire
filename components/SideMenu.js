import SideNav from "./SideNav";

export default ({username}) => {
    const menuData = [
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

    return (
        <SideNav data={menuData}/>
    );
}