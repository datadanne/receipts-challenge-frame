import { NextResponse } from "next/server";
import satori from "satori";
import sharp from "sharp";
import { join } from "path";
import * as fs from "fs";

const interPath = join(process.cwd(), "public/Inter-Regular.ttf");
let inter = fs.readFileSync(interPath);

interface Response {
  data: {
    total_miles: string;
  };
}

export async function GET() {
  const response = await fetch("https://leaderboard.receipts.xyz/api/eas", {
    cache: "no-store",
  });
  const { data } = (await response.json()) as Response;

  const now = new Date();
  const deadline = new Date("2024-01-29T00:00:00Z");
  const hoursLeft = Math.max(0, (deadline.getTime() - now.getTime()) / 36e5);

  const svg = await satori(
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        color: "white",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          backgroundColor: "black",
          color: "white",
          textTransform: "uppercase",
          fontSize: "14px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: "15px",
            paddingRight: "15px",
            paddingTop: "2px",
            paddingBottom: "1px",
          }}
        >
          <span>Challenge 001</span>
          <span>Time remaining: {Math.round(hoursLeft)} hours</span>
        </div>
        <img src="https://leaderboard.receipts.xyz/1000_miles_challenge_banner.png" />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingTop: "1px",
            paddingBottom: "2px",
          }}
        >
          <span>{data.total_miles} miles completed</span>
        </div>
      </div>
    </div>,
    {
      width: 416,
      height: 217.80,
      fonts: [
        {
          name: "Inter",
          data: inter,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );

  const img = await sharp(Buffer.from(svg))
    .resize(1200)
    .toFormat("png")
    .toBuffer();

  return new NextResponse(img, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
    },
  });
}
