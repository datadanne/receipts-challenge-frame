import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const imageUrl = `${process.env["HOST"]}/api/image`;

  return {
    title: "Receipts.xyz 1000 miles challenge",
    description: "Receipts.xyz 1000 miles challenge",
    openGraph: {
      title: "Receipts.xyz 1000 miles challenge",
      images: [imageUrl],
    },
    other: {
      "fc:frame": "vNext",
      "fc:frame:image": imageUrl,
      "fc:frame:button:1": "Start",
      "fc:frame:refresh_period": 60,
    },
  };
}

export default function Home() {
  const imageUrl = `${process.env["HOST"]}/api/image`;

  return (
    <main className="flex min-h-screen flex-col items-center align-center p-8 text-[#aaa] text-center gap-4">
      <p>
        View CHALLENGE 001 on{" "}
        <a
          href="https://leaderboard.receipts.xyz/strava?time_range=week&filter=moving_time"
          className="text-white"
          target="_blank"
        >
          receipts.xyz
        </a>
        .
      </p>
      <p className="mb-12">
        frame built by{" "}
        <a
          href="https://warpcast.com/datadanne.eth"
          className="text-white"
          target="_blank"
        >
          datadanne.eth
        </a>
      </p>

      <img src={imageUrl} />
    </main>
  );
}
