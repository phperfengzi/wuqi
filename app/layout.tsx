import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://qipu-arsenal.doublegpd.chatgpt.site'),
  title: '器·谱 —— 你的本命古代兵器',
  description: '通过 24 道情境与价值观问题，在 120 种中国古代兵器中找到最像你的一件。',
  openGraph: {
    title: '器·谱 —— 你的本命古代兵器',
    description: '24 道选择，120 种兵器，看你的行动原型最像哪一器。',
    images: [{ url:'/og.png', width:1730, height:909, alt:'器·谱——你的本命古代兵器' }],
  },
  twitter: {
    card:'summary_large_image',
    title:'器·谱 —— 你的本命古代兵器',
    description:'24 道选择，120 种兵器，看你的行动原型最像哪一器。',
    images:['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
