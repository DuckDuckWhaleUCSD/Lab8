const formatVolumeIconPath = require("../assets/scripts/main");

describe('format volume icon path', () => {
	test('volume 100', () => {
		expect(formatVolumeIconPath(100)).toContain(3);
	});
	test('volume 66', () => {
		expect(formatVolumeIconPath(66)).toContain(2);
	});
	test('volume 33', () => {
		expect(formatVolumeIconPath(33)).toContain(1);
	});
	test('volume 1', () => {
		expect(formatVolumeIconPath(1)).toContain(1);
	});
	test('volume 0', () => {
		expect(formatVolumeIconPath(0)).toContain(0);
	});
});
