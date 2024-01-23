import { faker } from '@faker-js/faker';
import { NextResponse } from 'next/server';

export async function GET() {
	const randomValue = Math.random();

	// Set a threshold for introducing errors (e.g., 20% chance)
	const errorThreshold = 0.4;

	if (randomValue < errorThreshold) {
		throw new Error('Random error occurred');
	}

	const res = {
		name: faker.person.fullName() as string,
		gender: faker.person.gender() as string,
		job: faker.person.jobTitle() as string,
	};

	return NextResponse.json({ res });
}
