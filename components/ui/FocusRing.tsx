// Consistent, accessible focus ring for keyboard navigation
export default function FocusRing() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-0 rounded-full ring-2 ring-accent ring-offset-2 pointer-events-none"
    />
  );
}
