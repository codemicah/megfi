import {createContext, useContext, useEffect, useState} from "react";
import {AuthClient} from "@dfinity/auth-client";
import { Identity } from "@dfinity/agent";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void; 
  logout: () => void;
  identity: Identity | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  identity: null
});

export function AuthProvider({children}: {children: React.ReactNode}) {
	const [authClient, setAuthClient] = useState<AuthClient | null>(null);
	const [identity, setIdentity] = useState<Identity | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		initAuth();
	}, []);

	async function initAuth() {
		const client = await AuthClient.create();
		setAuthClient(client);

		const isAuthenticated = await client.isAuthenticated();
		setIsAuthenticated(isAuthenticated);

		if (isAuthenticated) {
			const identity = client.getIdentity();

			setIdentity(identity);
		}
	}

	async function login() {
		if (!authClient) return;

		const identityProvider =
			// @ts-ignore
			process.env.DFX_NETWORK === "playground" || process.env.DFX_NETWORK === "ic"
				? "https://identity.ic0.app/#authorize"
				// @ts-ignore
				: `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`;

				console.log("identityProvider", process.env.DFX_NETWORK);


		await authClient.login({
			identityProvider: identityProvider,
			onSuccess: async () => {
				setIsAuthenticated(true);
				const identity = authClient.getIdentity();
				setIdentity(identity);
			},
		});
	}

	async function logout() {
		if (!authClient) return;
		await authClient.logout();
		setIsAuthenticated(false);
		setIdentity(null);
	}

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				identity,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = (): AuthContextType => useContext(AuthContext);
