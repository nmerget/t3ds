import { Card } from '@/components/daisyui';
import { getIntlayer } from 'intlayer';
import { useParams } from '@tanstack/react-router';
import { User } from './user.data';

export function UserPage({ user }: { user: User }) {
  const { locale } = useParams({ strict: false });
  const {
    title,
    firstName,
    lastName,
    email,
    status,
    provider,
    lastAccess,
    emailNotifications,
    enabled,
    disabled,
  } = getIntlayer('user', locale);

  return (
    <div className="mx-auto max-w-4xl">
      <Card title={title} className="mb-6">
        <div
          className="
          grid grid-cols-1 gap-4
          md:grid-cols-2
        "
        >
          <div>
            <p className="text-sm text-base-content/70">{firstName}</p>
            <p className="font-medium">{user.first_name}</p>
          </div>
          <div>
            <p className="text-sm text-base-content/70">{lastName}</p>
            <p className="font-medium">{user.last_name}</p>
          </div>
          <div>
            <p className="text-sm text-base-content/70">{email}</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-base-content/70">{status}</p>
            <p className="font-medium capitalize">{user.status}</p>
          </div>
          <div>
            <p className="text-sm text-base-content/70">{provider}</p>
            <p className="font-medium">{user.provider}</p>
          </div>
          <div>
            <p className="text-sm text-base-content/70">{lastAccess}</p>
            <p className="font-medium">
              {new Date(user.last_access).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-base-content/70">{emailNotifications}</p>
            <p className="font-medium">
              {user.email_notifications ? enabled : disabled}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
