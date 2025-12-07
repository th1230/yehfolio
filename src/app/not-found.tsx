import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="max-w-md text-center">
        <div className="text-sandy-brown mb-8 text-9xl font-bold">404</div>
        <h1 className="text-outer-space dark:text-apricot mb-4 text-3xl font-bold">找不到頁面</h1>
        <p className="text-outer-space/80 dark:text-apricot/80 mb-8 text-lg">
          抱歉，您要找的頁面不存在或已被移除。
        </p>
        <Link
          href="/"
          className="bg-sandy-brown hover:bg-sandy-brown/90 inline-block rounded-lg px-8 py-3 font-medium text-white transition-colors"
        >
          返回首頁
        </Link>
      </div>
    </div>
  );
}
