export const buildPerformance = () => {
	const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

	console.log({
		diffBodySize: nav.decodedBodySize - nav.encodedBodySize,
		toStart: nav.responseStart - nav.requestStart,
		toEnd: nav.responseEnd - nav.requestStart,
	});
};

export type LiPatternsProps = {
	number: 10 | 1000 | 100000;
};

export const buildingData = (max: number) => [...Array(max)].map((_, i) => `item${i}`);
