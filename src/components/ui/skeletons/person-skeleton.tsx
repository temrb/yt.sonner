import React from 'react';
import { Skeleton } from '../skeleton';

const PersonSkeleton = () => {
	return (
		<div className='flex flex-col items-start space-y-2 p-4'>
			<Skeleton className='h-4 w-32' />
			<Skeleton className='h-4 w-40 opacity-80' />
			<Skeleton className='h-4 w-20 opacity-40' />
		</div>
	);
};

export default PersonSkeleton;
