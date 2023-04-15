import CommonLoader from '.';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
function Loading() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     const handleStart = (url) => url !== router.asPath && setLoading(true);
  //     const handleComplete = (url) => url === router.asPath && setLoading(false);

  //     router.events.on('routeChangeStart', handleStart);
  //     router.events.on('routeChangeComplete', handleComplete);
  //     router.events.on('routeChangeError', handleComplete);

  //     return () => {
  //       router.events.off('routeChangeStart', handleStart);
  //       router.events.off('routeChangeComplete', handleComplete);
  //       router.events.off('routeChangeError', handleComplete);
  //     };
  //   });
  useEffect(() => {
    router.events.on('routeChangeError', (e) => setLoading(false));
    router.events.on('routeChangeStart', (e) => setLoading(true));
    router.events.on('routeChangeComplete', (e) => setLoading(false));

    return () => {
      router.events.off('routeChangeError', (e) => setLoading(false));
      router.events.off('routeChangeStart', (e) => setLoading(false));
      router.events.off('routeChangeComplete', (e) => setLoading(true));
    };
  }, [router.events]);
  return loading && <CommonLoader />;
}
export default Loading;
