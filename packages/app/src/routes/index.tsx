import { createFileRoute } from '@tanstack/react-router';
import Redirect from '@/pages/_Redirect';

export const Route = createFileRoute('/')({
  component: Redirect,
});
