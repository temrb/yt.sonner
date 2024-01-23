'use client';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading/loading-spinner';
import PersonSkeleton from '@/components/ui/skeletons/person-skeleton';
import { Check, ListRestart, UserPlus2 } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface Person {
	name: string;
	gender: string;
	job: string;
}

export default function Home() {
	const [people, setPeople] = useState<Person[]>([]);
	const [loading, setLoading] = useState(false);
	const [clear, setClear] = useState(false);

	const testFetch = async () => {
		try {
			setLoading(true);
			const res = await fetch('/api/test');
			const data = await res.json();
			const person = data.res as Person;
			toast.success(`Hello ${person.name}!`);
			setPeople((prevPeople) => [...prevPeople, person]);
		} catch (error) {
			setLoading(false);
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className='flex min-h-screen flex-col items-center justify-center space-y-6 p-4'>
			<div className='mx-auto flex h-72 w-full max-w-xl flex-col overflow-x-hidden overflow-y-scroll rounded-lg border-2 border-border p-2'>
				{people.length === 0 && loading === false ? (
					<p className='text-center text-base'>
						No people added yet.
					</p>
				) : (
					<Person people={people} />
				)}
				{loading && <PersonSkeleton />}
			</div>
			<div className='flex flex-col space-y-2'>
				<Button
					onClick={() => {
						setLoading(true);
						// Simulate loading
						setTimeout(() => {
							testFetch();
						}, 550);
					}}
					variant={'secondary'}
					disabled={loading}
				>
					<span className='flex flex-row items-center space-x-2'>
						{loading ? (
							<LoadingSpinner size={18} />
						) : (
							<UserPlus2 size={18} />
						)}
						<p>Add Person</p>
					</span>
				</Button>
				<Button
					onClick={() => {
						setPeople([]);
						setClear(true);
						setTimeout(() => {
							setClear(false);
						}, 800);
					}}
					disabled={clear || people.length === 0}
					variant={'ghost'}
				>
					<span className='flex transform flex-row items-center space-x-2'>
						{clear ? (
							<>
								<Check size={18} />
								<p>Cleared</p>
							</>
						) : (
							<>
								<ListRestart size={18} />
								<p>Clear</p>
							</>
						)}
					</span>
				</Button>
			</div>
		</main>
	);
}

const Person = ({ people }: { people: Person[] }) => {
	return (
		<div className='flex flex-col divide-y-2'>
			{people.map((person, index) => (
				<span className='flex flex-col items-start p-4' key={index}>
					<p className='text-lg font-semibold'>{person.name}</p>
					<p className='text-sm'>{person.job}</p>
					<p className='text-xs'>{person.gender}</p>
				</span>
			))}
		</div>
	);
};
