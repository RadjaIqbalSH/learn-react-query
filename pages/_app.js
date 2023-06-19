import "@/styles/globals.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
}
