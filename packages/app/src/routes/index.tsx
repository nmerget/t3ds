import { createFileRoute } from '@tanstack/react-router';
import RedirectPage from '@/routes/redirect.page';

export const Route = createFileRoute('/')({
  component: RedirectPage,
});
