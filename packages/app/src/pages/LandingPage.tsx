import { Button, Card } from '@/components/daisyui';
import { LocalizedLink } from '@/components/LocalizedLink.tsx';
import { getIntlayer } from 'intlayer';
import { useParams } from '@tanstack/react-router';

export function LandingPage() {
  const { locale } = useParams({ strict: false });
  const { title, subtitle, features } = getIntlayer('landing', locale);

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-5xl font-bold">{title}</h2>
          <p className="text-xl text-base-content/70">{subtitle}</p>
        </div>

        <div
          className="
          grid grid-cols-1 gap-6
          md:grid-cols-2
          lg:grid-cols-3
        "
        >
          <Card title={features.router.title} className="card-border">
            <p className="mb-4 text-base-content/70">
              {features.router.description}
            </p>
            <div className="card-actions">
              <LocalizedLink className="btn" to="/demo/songs">
                {features.router.button}
              </LocalizedLink>
            </div>
          </Card>

          <Card title={features.directus.title} className="card-border">
            <p className="mb-4 text-base-content/70">
              {features.directus.description}
            </p>
            <div className="card-actions">
              <Button disabled>{features.directus.button}</Button>
            </div>
          </Card>

          <Card title={features.daisyui.title} className="card-border">
            <p className="mb-4 text-base-content/70">
              {features.daisyui.description}
            </p>
            <div className="card-actions">
              <Button disabled>{features.daisyui.button}</Button>
            </div>
          </Card>

          <Card title={features.i18n.title} className="card-border">
            <p className="mb-4 text-base-content/70">
              {features.i18n.description}
            </p>
            <div className="card-actions">
              <Button disabled>{features.i18n.button}</Button>
            </div>
          </Card>

          <Card title={features.react.title} className="card-border">
            <p className="mb-4 text-base-content/70">
              {features.react.description}
            </p>
            <div className="card-actions">
              <Button disabled>{features.react.button}</Button>
            </div>
          </Card>

          <Card title={features.auth.title} className="card-border">
            <p className="mb-4 text-base-content/70">
              {features.auth.description}
            </p>
            <div className="card-actions">
              <LocalizedLink to="/login">
                <Button>{features.auth.button}</Button>
              </LocalizedLink>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
