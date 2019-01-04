'use strict';

/* eslint-disable max-len */
module.exports = {
	meetups: [{
		id: 1,
		createdOn: 'Monday, 31st December 2018',
		location: 'Lagos',
		images: ['http://localhost:5100/api/v1/image.png'],
		topic: 'Kubernetes Conference @ Tech Zone',
		happeningOn: '2019-31-05',
		startTime: '10: 00 am',
		Tags: ['api', 'endpoints']
	}, {
		id: 2,
		createdOn: 'Monday, 3rd January 2018',
		location: 'Lagos',
		images: ['http://localhost:5100/api/v1/image.png'],
		topic: 'Modern Javascript features',
		happeningOn: '2019-01-04',
		startTime: '3: 00 pm',
		Tags: ['es6', 'mocha', 'endpoints']
	}],
	questions: [{
		id: 1,
		createdOn: 'Monday, 31st December 2018',
		createdBy: 1,
		meetup: 1,
		title: 'What is Kubernetes?',
		body: 'Kubernetes is an open-source container management tool which holds the responsibilities of container deployment, scaling & descaling of containers & load balancing. Being the Google’s brainchild, it offers excellent community and works brilliantly with all the cloud providers. So, we can say that Kubernetes is not a containerization platform, but it is a multi-container management solution.',
		votes: 1,
		upVoted: [1],
		downVoted: [2],
		permitted: true
	}, {
		id: 2,
		createdOn: 'Monday, 31st December 2018',
		createdBy: 1,
		meetup: 1,
		title: 'How is Kubernetes related to Docker?',
		body: 'It’s a known fact that Docker provides the lifecycle management of containers and a Docker image builds the runtime containers. But, since these individual containers have to communicate, Kubernetes is used.  So, Docker builds the containers and these containers communicate with each other via Kubernetes. So, containers running on multiple hosts can be manually linked and orchestrated using Kubernetes.',
		votes: 99,
		upVoted: [1],
		downVoted: [2],
		permitted: true
	}, {
		id: 3,
		createdOn: 'Monday, 31st December 2018',
		createdBy: 1,
		meetup: 1,
		title: 'What is Container Orchestration?',
		body: 'Consider a scenario where you have 5-6 microservices for an application. Now, these microservices are put in individual containers, but won’t be able to communicate without container orchestration. So, as orchestration means the amalgamation of all instruments playing together in harmony in music, similarly container orchestration means all the services in individual containers working together to fulfill the needs of a single server.',
		votes: 0,
		upVoted: [1],
		downVoted: [9],
		permitted: true
	}],
	rsvps: [{
		id: 1,
		meetup: 1,
		user: 1,
		response: 'yes'
	}, {
		id: 2,
		meetup: 1,
		user: 1,
		response: 'no'
	}, {
		id: 3,
		meetup: 2,
		user: 1,
		response: 'maybe'
	}]
};
//# sourceMappingURL=data.js.map