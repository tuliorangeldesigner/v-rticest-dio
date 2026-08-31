import { Helmet } from 'react-helmet-async';

const ADSENSE_CLIENT_ID = import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT_ID;

const GoogleAdSense = () => {
  if (!ADSENSE_CLIENT_ID || !/^ca-pub-\d{16}$/.test(ADSENSE_CLIENT_ID)) {
    return null;
  }

  return (
    <Helmet>
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
        crossOrigin="anonymous"
      />
    </Helmet>
  );
};

export default GoogleAdSense;
