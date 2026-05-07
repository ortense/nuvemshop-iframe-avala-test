import { Iframe } from "@tiendanube/nube-sdk-jsx";
import type { NubeSDK, UISlot } from "@tiendanube/nube-sdk-types";

const BASE_URL = "http://localhost:5500";

export function App(nube: NubeSDK) {
	const iframe = (
		<Iframe
			id="test-iframe"
			src={
				`${BASE_URL}/widgetsLoader/storeSnippets.html` as `https://${string}`
			}
			height={200}
			width="100%"
			onMessage={(event) => {
				const data = event.value;

				console.log("[PARENT] message from iframe:", data);

				if (!data || data.source !== "AVALA_WIDGET") {
					return;
				}

				if (data.type === "READY") {
					nube.getBrowserAPIs().postMessageToIframe(iframe, {
						source: "AVALA_NUBE",
						type: "PING",
						message: "Hello from parent",
					});
				}
			}}
		/>
	);

	nube.render("after_product_detail_add_to_cart" as UISlot, iframe);
}
