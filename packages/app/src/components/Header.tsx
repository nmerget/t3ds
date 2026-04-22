import { LocalizedLink } from '@/components/LocalizedLink';
import { getIntlayer } from 'intlayer';
import { useParams } from '@tanstack/react-router';
import { Navigation } from './daisyui';
import { Headphones, House, User } from 'lucide-react';

const Header = () => {
  const { locale } = useParams({ strict: false });
  const { title, navigation } = getIntlayer('app', locale);

  return (
    <header className="header">
      <Navigation
        brand={
          <LocalizedLink>
            <h1>{title}</h1>
          </LocalizedLink>
        }
        items={{
          home: (
            <LocalizedLink to="/" activeOptions={{ exact: true }}>
              <House size="20" />
              {navigation.home}
            </LocalizedLink>
          ),
          songs: (
            <LocalizedLink to="/demo/songs">
              <Headphones size="20" />
              {navigation.songs}
            </LocalizedLink>
          ),
          user: (
            <LocalizedLink to="/user">
              <User size="20" />
              {navigation.user}
            </LocalizedLink>
          ),
        }}
      ></Navigation>
    </header>
  );
};

export default Header;
