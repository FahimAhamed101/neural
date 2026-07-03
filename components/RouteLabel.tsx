export default function RouteLabel({ path }: { path: string }) {
  return (
    <p className="route-label mb-4" aria-hidden="true">
      {path}
    </p>
  );
}
