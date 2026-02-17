import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const resolveLinkPath = (childTo, parentTo) => `${parentTo}/${childTo}`;


export default function NavItemChildren (props) {
  const { asPath } = useRouter();
  const { item } = props;
  const { label, Icon, to: headerToPath, children } = item;

  const [isExpanded, setExpanded] = useState(
    asPath.includes(headerToPath)
  );

  const onExpandedChange = () => {
    setExpanded(!isExpanded);
  };

  return (
    <li>
      <button className={`flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group dark:text-white ${isExpanded && 'dark:bg-gray-400'} dark:bg-gray-700`}
        onClick={onExpandedChange}
      >
      <span className="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item="">{label}</span>
      </button>

      {isExpanded && (
        <ul>
          {children.map((item, index) => {
            const key = `${item.label}-${index}`;

            const { label, Icon, children } = item;

            if (children) {
              return (
                <div key={key}>
                  <NavItemChildren
                    item={{
                      ...item,
                      to: resolveLinkPath(item.to, props.item.to),
                    }}
                  />
                </div>
              );
            }

            return (
              <Link legacyBehavior
                key={key}
                href={resolveLinkPath(item.to, props.item.to)}
              >
                <a className={`flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}>
                <span>{label}</span>
                </a>
              </Link>
            );
          })}
        </ul>
      )}
      </li>
  );
};


