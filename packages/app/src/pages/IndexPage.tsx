import { getIntlayer } from 'intlayer';
import { useParams } from '@tanstack/react-router';

export function IndexPage() {
  const { locale } = useParams({ strict: false });
  const { title, welcome } = getIntlayer('index', locale);

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-bold">{title}</h1>
        <p className="text-lg text-base-content/70">{welcome}</p>
      </div>
    </div>
  );
}
