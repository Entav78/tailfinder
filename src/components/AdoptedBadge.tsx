/**
 * @component AdoptedBadge
 * A small badge used to indicate that a pet has been adopted.
 *
 * Accessibility:
 * - Uses `role="status"` and `aria-label` to announce the adoption status for screen readers.
 *
 * Styling:
 * - Applies default styling for background, text, padding, and shadow
 * - Accepts an optional `className` prop for additional customization (e.g., margins, positioning)
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - Optional class names for layout or styling overrides
 *
 * @returns {JSX.Element} A styled "Adopted" badge
 */
interface AdoptedBadgeProps {
  className?: string;
}

export const AdoptedBadge = ({ className = '' }: AdoptedBadgeProps) => {
  return (
    <div
      role="status"
      aria-label="Pet has been adopted"
      className={`bg-adoptedBadge text-text-base-dark text-xs px-2 py-1 rounded shadow ${className}`}
    >
      Adopted
    </div>
  );
};
