import { faker } from '@faker-js/faker';

export async function GET() {
	const res = {
		name: faker.person.fullName() as string,
		gender: faker.person.gender() as string,
		job: faker.person.jobTitle() as string,
	};

	return Response.json({ res });
}
