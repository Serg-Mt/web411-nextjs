import Link from 'next/link';
const
  pages = [
    { href: '/', title: 'Home' },
    { href: '/about', title: 'useState + Lifting State Up' },
    { href: '/life-cycle', title: 'Lifecycle + useEffect' },
    { href: '/fetch-user', title: 'Fetch' },
    {href:'/todo', title:'Todo List'}
  ];

export function Nav() {
  return <nav>
    <ul>
      {pages.map(({ href, title }) => <li key={href}>
        <Link href={href}>{title}</Link>
      </li>)}
    </ul>
  </nav>
}