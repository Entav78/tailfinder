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
