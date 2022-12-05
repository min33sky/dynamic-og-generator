/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

const baseUrl = 'http://localhost:3000';

const interMedium = fetch(
  new URL('../../public/fonts/Inter-Medium.ttf', import.meta.url),
).then((res) => res.arrayBuffer());

const interRegular = fetch(
  new URL('../../public/fonts/Inter-Regular.ttf', import.meta.url),
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const interMediumFontData = await interMedium;
  const interRegularFontData = await interRegular;

  const title = searchParams.get('title') || 'Next.js';
  const description = searchParams.get('description') || 'The React Framework';

  return new ImageResponse(
    (
      <div tw="flex flex-row-reverse h-full bg-neutral-800">
        <div tw="flex w-1/2 h-full">
          <img tw="w-full h-full" src={`${baseUrl}/prism.png`} alt="prism" />
          <div
            tw="absolute left-[-80px] top-[-30px] w-[150px] h-[120%] bg-neutral-800"
            style={{
              transform: 'rotate(12deg)',
            }}
          ></div>
        </div>
        <div tw="flex flex-col w-1/2 p-[48px] mt-auto text-white">
          <h1 tw="text-[52px]">{title}</h1>
          <p tw="text-[26px] text-neutral-400">{description}</p>
        </div>
      </div>
    ),
    {
      fonts: [
        {
          name: 'Inter',
          data: interMediumFontData,
          weight: 500,
        },
        {
          name: 'Inter',
          data: interRegularFontData,
          weight: 400,
        },
      ],
    },
  );
}
