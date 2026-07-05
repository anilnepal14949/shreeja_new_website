export type SocialPlatform = "facebook" | "instagram" | "linkedin" | "tiktok";

const paths: Record<SocialPlatform, string> = {
  facebook:
    "M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1z",
  instagram:
    "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.2-2.4a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  linkedin:
    "M4.5 3.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM3.3 9h2.4v11.5H3.3V9zM9.6 9h2.3v1.6h.03c.32-.6 1.1-1.24 2.28-1.24 2.44 0 2.89 1.6 2.89 3.69v6.45h-2.4v-5.72c0-1.36-.02-3.1-1.89-3.1-1.9 0-2.19 1.48-2.19 3v5.82H9.6V9z",
  tiktok:
    "M14.5 3h2.6c.16 1.4.9 2.6 2.1 3.3.7.4 1.5.7 2.3.7v2.7c-1.5 0-2.9-.5-4.1-1.3v6.8c0 3-2.4 5.4-5.4 5.4S6.6 17.4 6.6 14.4c0-2.8 2.1-5.1 4.8-5.4v2.8a2.7 2.7 0 1 0 2.7 2.7V3z",
};

export default function SocialIcon({
  platform,
  size = 18,
}: {
  platform: SocialPlatform;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={paths[platform]} />
    </svg>
  );
}
