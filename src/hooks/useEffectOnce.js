import { useEffect, useRef } from 'react';

export const useEffectOnce = (callback) => {
	const count = useRef(0);

	useEffect(() => {
		if (count.current > 0) {
			return;
		}

		count.current++;
		callback();
	}, [callback]);
};
