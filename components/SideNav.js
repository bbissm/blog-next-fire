import NavItem from "./NavItem";

export default ({data}) => {
    return (
        <aside className="w-64" aria-label="Sidebar">
            <div className="h-full overflow-y-auto py-4 px-3 bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2">
                    {data.map((item,index) => {
                        return (
                            <NavItem key={`${item.label}-${index}`} item={item}/>
                        )
                    })}
                </ul>
            </div>
        </aside>
    );
}