import http from "k6/http"
import { sleep, check } from "k6"

export const options = {
	insecureSkipTLSVerify: true,
	noConnectionReuse: false,
	vus: 5000,
	duration: "30s"
}

// Test configuration
// export const options = {
// 	thresholds: {
// 		// Assert that 99% of requests finish within 3000ms.
// 		http_req_duration: ["p(99) < 3000"]
// 	},
// 	// Ramp the number of virtual users up and down
// 	stages: [
// 		{ duration: "30s", target: 15 },
// 		{ duration: "1m", target: 15 },
// 		{ duration: "20s", target: 0 }
// 	]
// }

// Simulated user behavior
export default function () {
	let res = http.get("https://waronkhoff.github.io/mfe_wmf_host/")
	// Validate response status
	check(res, { "status was 200": (r) => r.status == 200 })
	sleep(1)
}
